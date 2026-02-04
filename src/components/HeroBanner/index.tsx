import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function HeroBanner(): React.JSX.Element {
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <h1 className={styles.title}>Strata</h1>
        <p className={styles.subtitle}>
          An embedded database for AI agents — six primitives, branch isolation,
          and deterministic replay.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/getting-started/">
            Get Started
          </Link>
          <Link
            className="button button--outline button--lg"
            href="https://github.com/stratadb/strata-core">
            GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}
