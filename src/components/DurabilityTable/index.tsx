import React from 'react';
import styles from './styles.module.css';

type DurabilityMode = {
  mode: string;
  latency: string;
  throughput: string;
  dataLoss: string;
};

const modes: DurabilityMode[] = [
  {
    mode: 'Ephemeral',
    latency: '<3 \u00b5s',
    throughput: '250K+ ops/sec',
    dataLoss: 'All',
  },
  {
    mode: 'Buffered',
    latency: '<30 \u00b5s',
    throughput: '50K+ ops/sec',
    dataLoss: 'Last ~100ms',
  },
  {
    mode: 'Strict',
    latency: '~2 ms',
    throughput: '~500 ops/sec',
    dataLoss: 'None',
  },
];

export default function DurabilityTable(): React.JSX.Element {
  return (
    <section className={styles.durability}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Durability Modes</h2>
        <p className={styles.sectionSubtitle}>
          Choose your speed/safety trade-off.
        </p>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Mode</th>
                <th>Latency</th>
                <th>Throughput</th>
                <th>Data Loss on Crash</th>
              </tr>
            </thead>
            <tbody>
              {modes.map((m) => (
                <tr key={m.mode}>
                  <td><strong>{m.mode}</strong></td>
                  <td>{m.latency}</td>
                  <td>{m.throughput}</td>
                  <td>{m.dataLoss}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
