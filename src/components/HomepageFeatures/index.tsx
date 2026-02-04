import React from 'react';
import styles from './styles.module.css';

type Primitive = {
  name: string;
  purpose: string;
  methods: string;
};

const primitives: Primitive[] = [
  {
    name: 'KV Store',
    purpose: 'Working memory, config, scratchpads',
    methods: 'kv_put, kv_get, kv_delete, kv_list',
  },
  {
    name: 'Event Log',
    purpose: 'Immutable audit trail, tool call history',
    methods: 'event_append, event_read, event_read_by_type',
  },
  {
    name: 'State Cell',
    purpose: 'CAS-based coordination, counters, locks',
    methods: 'state_set, state_read, state_cas, state_init',
  },
  {
    name: 'JSON Store',
    purpose: 'Structured documents with path-level mutations',
    methods: 'json_set, json_get, json_delete, json_list',
  },
  {
    name: 'Vector Store',
    purpose: 'Embeddings and similarity search (brute-force + HNSW)',
    methods: 'vector_upsert, vector_search, vector_batch_upsert',
  },
  {
    name: 'Branch',
    purpose: 'Data isolation (like git branches)',
    methods: 'create_branch, set_branch, list_branches, delete_branch',
  },
];

function PrimitiveCard({name, purpose, methods}: Primitive) {
  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      <p>{purpose}</p>
      <code className={styles.methods}>{methods}</code>
    </div>
  );
}

export default function HomepageFeatures(): React.JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Six Primitives</h2>
        <p className={styles.sectionSubtitle}>
          Everything an AI agent needs, in one embedded database.
        </p>
        <div className={styles.grid}>
          {primitives.map((p) => (
            <PrimitiveCard key={p.name} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
