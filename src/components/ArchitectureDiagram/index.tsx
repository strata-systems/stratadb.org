import React from 'react';
import styles from './styles.module.css';

const diagram = `+-----------------------------------------------------------+
|  Strata API (KV, Event, State, JSON, Vector, Branch, Space)|
+-----------------------------------------------------------+
|  Executor (Command dispatch) / Session (Transactions)     |
+-----------------------------------------------------------+
|  Engine (Database, Primitives, Transaction coordination)  |
+-----+-----------------------+-----------------------------+
      |                       |
+-----v-------+  +------------v----------+  +--------------+
| Concurrency |  |  Durability           |  | Intelligence |
| (OCC, CAS)  |  |  (WAL, Snapshots)     |  | (Search,BM25)|
+-------------+  +----------+------------+  +--------------+
                             |
                   +---------v---------+  +--------------+
                   |  Storage          |  |  Security    |
                   |  (ShardedStore)   |  |  (Access)    |
                   +-------------------+  +--------------+`;

export default function ArchitectureDiagram(): React.JSX.Element {
  return (
    <section className={styles.architecture}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Architecture</h2>
        <p className={styles.sectionSubtitle}>
          Unified storage with pluggable concurrency, durability, and indexing.
        </p>
        <div className={styles.diagramWrapper}>
          <pre className={styles.diagram}>{diagram}</pre>
        </div>
      </div>
    </section>
  );
}
