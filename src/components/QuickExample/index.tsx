import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

const exampleCode = `use stratadb::Strata;
use stratadb::Value;

fn main() -> stratadb::Result<()> {
    // Open a persistent database
    let mut db = Strata::open("./my-data")?;

    // All data lives in a "branch" (like a git branch)
    // You start on the "default" branch automatically
    db.kv_put("user:name", "Alice")?;
    db.kv_put("user:score", 42i64)?;

    // Create an isolated branch for an experiment
    db.create_branch("experiment-1")?;
    db.set_branch("experiment-1")?;

    // Data is isolated — "user:name" doesn't exist here
    assert!(db.kv_get("user:name")?.is_none());

    // Switch back to default
    db.set_branch("default")?;
    assert_eq!(db.kv_get("user:name")?, Some(Value::String("Alice".into())));

    Ok(())
}`;

export default function QuickExample(): React.JSX.Element {
  return (
    <section className={styles.example}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Quick Example</h2>
        <p className={styles.sectionSubtitle}>
          Get started with just a few lines of Rust.
        </p>
        <div className={styles.codeWrapper}>
          <CodeBlock language="rust">{exampleCode}</CodeBlock>
        </div>
      </div>
    </section>
  );
}
