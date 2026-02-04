#!/usr/bin/env node

/**
 * Sync documentation from source repositories into the Docusaurus site.
 *
 * Usage:  node scripts/sync-docs.mjs
 *
 * Reads sync.config.json for source definitions, mappings, and link rewrite
 * rules. Uses local paths when available (fast local dev), falls back to
 * shallow git clones for CI.
 *
 * Zero external dependencies — uses only Node.js built-ins.
 */

import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, statSync, existsSync, cpSync } from 'node:fs';
import { join, dirname, relative, resolve, extname } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const config = JSON.parse(readFileSync(join(ROOT, 'sync.config.json'), 'utf-8'));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Recursively collect all .md files under `dir`, returning paths relative to `dir`. */
function walkMd(dir, base = '') {
  const results = [];
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      results.push(...walkMd(join(dir, entry.name), rel));
    } else if (entry.name.endsWith('.md')) {
      results.push(rel);
    }
  }
  return results;
}

/** Test whether `relPath` matches any of the minimatch-style glob patterns. */
function matchesAny(relPath, patterns) {
  if (!patterns || patterns.length === 0) return false;
  return patterns.some(pat => {
    // Convert simple glob to regex: ** = anything, * = segment
    const re = new RegExp(
      '^' +
        pat
          .replace(/\./g, '\\.')
          .replace(/\*\*/g, '§§')
          .replace(/\*/g, '[^/]*')
          .replace(/§§/g, '.*') +
        '$',
    );
    return re.test(relPath);
  });
}

/**
 * Rewrite markdown link URLs in `content`.
 *
 * Splits on fenced code blocks to avoid rewriting inside code.
 * Applies the first matching rule from `rules` (already filtered by scope).
 */
function rewriteLinks(content, rules) {
  if (!rules || rules.length === 0) return content;

  // Split on fenced code blocks (``` ... ```)
  const parts = content.split(/(```[\s\S]*?```)/g);

  for (let i = 0; i < parts.length; i++) {
    // Odd-indexed parts are code blocks — skip them
    if (i % 2 === 1) continue;

    parts[i] = parts[i].replace(
      /\[([^\]]*)\]\(([^)]+)\)/g,
      (match, text, url) => {
        // Skip external URLs and anchors
        if (/^https?:\/\//.test(url) || url.startsWith('#')) return match;

        // Separate anchor from path
        const [path, anchor] = url.split('#');

        for (const rule of rules) {
          const re = new RegExp(rule.pattern);
          if (re.test(path)) {
            let newPath = path.replace(re, rule.replacement);
            // Only normalize internal paths (not external URLs)
            if (!/^https?:\/\//.test(newPath)) {
              // Normalize /foo/index → /foo/
              newPath = newPath.replace(/\/index$/, '/');
              // Strip trailing .md for Docusaurus-style links
              newPath = newPath.replace(/\.md$/, '');
            }
            const suffix = anchor ? `#${anchor}` : '';
            return `[${text}](${newPath}${suffix})`;
          }
        }
        return match;
      },
    );
  }

  return parts.join('');
}

// ---------------------------------------------------------------------------
// Source resolution
// ---------------------------------------------------------------------------

/**
 * Resolve source directory: use local path if it exists, otherwise shallow-clone.
 * Returns { path, cleanup } where cleanup() removes the temp clone.
 */
function resolveSource(name, source) {
  const localAbs = resolve(ROOT, source.localPath);
  if (existsSync(localAbs)) {
    console.log(`  [${name}] Using local path: ${localAbs}`);
    return { path: localAbs, cleanup: () => {} };
  }

  const tmpDir = join(ROOT, '.sync-tmp', name);
  rmSync(tmpDir, { recursive: true, force: true });
  mkdirSync(tmpDir, { recursive: true });

  const ref = source.ref || 'main';
  console.log(`  [${name}] Cloning ${source.repo} (ref=${ref}) → ${tmpDir}`);
  execSync(`git clone --depth 1 --branch ${ref} ${source.repo} ${tmpDir}`, {
    stdio: 'inherit',
  });

  return {
    path: tmpDir,
    cleanup: () => rmSync(tmpDir, { recursive: true, force: true }),
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

console.log('sync-docs: starting');

for (const [name, source] of Object.entries(config.sources)) {
  console.log(`\nProcessing source: ${name}`);
  const resolved = resolveSource(name, source);

  try {
    for (const mapping of source.mappings) {
      const srcDir = join(resolved.path, mapping.from);
      const destDir = join(ROOT, mapping.to);

      // Clean target
      rmSync(destDir, { recursive: true, force: true });
      mkdirSync(destDir, { recursive: true });

      // Collect files
      const files = walkMd(srcDir);
      const excluded = mapping.exclude || [];

      // Filter rewrite rules by scope (target mapping name)
      const rules = (source.linkRewrites || []).filter(
        r => !r.scope || r.scope === mapping.to,
      );

      let copied = 0;
      for (const relFile of files) {
        if (matchesAny(relFile, excluded)) continue;

        const srcFile = join(srcDir, relFile);
        const destFile = join(destDir, relFile);

        mkdirSync(dirname(destFile), { recursive: true });

        let content = readFileSync(srcFile, 'utf-8');
        content = rewriteLinks(content, rules);
        writeFileSync(destFile, content);
        copied++;
      }

      console.log(`  ${mapping.from} → ${mapping.to}: ${copied} files`);
    }
  } finally {
    resolved.cleanup();
  }
}

console.log('\nsync-docs: done');
