---
title: "StrataDB Documentation"
sidebar_position: 0
---

# StrataDB Documentation

Welcome to the StrataDB documentation. StrataDB is an embedded database for AI agents, providing six data primitives with branch-based isolation, OCC transactions, and three durability modes.

## Quick Links

| I want to... | Go to |
|---|---|
| Install StrataDB and run my first example | [Getting Started](getting-started/installation) |
| Understand what branches are and how data isolation works | [Concepts: Branches](concepts/branches) |
| Organize data within branches using spaces | [Guide: Spaces](guides/spaces) |
| Learn how to use a specific primitive | [Guides](guides/) |
| See every method at a glance | [API Quick Reference](reference/api-quick-reference) |
| Build a real-world pattern (agent state, RAG, etc.) | [Cookbook](cookbook/) |
| Understand the architecture | [Architecture Overview](/architecture/) |
| Contribute to StrataDB | [Contributing](https://github.com/stratadb/strata-core/blob/main/CONTRIBUTING.md) |

## For Users

### [Getting Started](getting-started/installation)

Installation, feature flags, and a step-by-step tutorial that covers all six primitives.

### [Concepts](concepts/)

Core ideas you need to understand: [branches](concepts/branches), [primitives](concepts/primitives), [value types](concepts/value-types), [transactions](concepts/transactions), and [durability](concepts/durability).

### [Guides](guides/)

Per-primitive walkthroughs: [KV Store](guides/kv-store), [Event Log](guides/event-log), [State Cell](guides/state-cell), [JSON Store](guides/json-store), [Vector Store](guides/vector-store), [Branch Management](guides/branch-management). Plus cross-cutting guides on [spaces](guides/spaces), [observability](guides/observability), [search](guides/search), [sessions and transactions](guides/sessions-and-transactions), [branch bundles](guides/branch-bundles), [configuration](guides/database-configuration), and [error handling](guides/error-handling).

### [Cookbook](cookbook/)

Recipes for real-world patterns: [agent state management](cookbook/agent-state-management), [multi-agent coordination](cookbook/multi-agent-coordination), [RAG with vectors](cookbook/rag-with-vectors), [deterministic replay](cookbook/deterministic-replay), and [A/B testing with branches](cookbook/ab-testing-with-branches).

### [Reference](reference/)

Complete specifications: [API quick reference](reference/api-quick-reference), [value types](reference/value-type-reference), [errors](reference/error-reference), [commands](reference/command-reference), and [configuration](reference/configuration-reference).

### [Troubleshooting](troubleshooting) and [FAQ](faq)

Common issues, error messages, and frequently asked questions.

## For Contributors

### [Contributing](https://github.com/stratadb/strata-core/blob/main/CONTRIBUTING.md)

Development setup, workspace structure, running tests, code style, and pull request process.

### [Architecture](/architecture/)

How StrataDB works internally: [crate structure](/architecture/crate-structure), [storage engine](/architecture/storage-engine), [durability and recovery](/architecture/durability-and-recovery), and [concurrency model](/architecture/concurrency-model).

### [Changelog](https://github.com/stratadb/strata-core/blob/main/CHANGELOG.md)

Release history and notable changes.
