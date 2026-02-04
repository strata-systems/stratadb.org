import React from 'react';
import Layout from '@theme/Layout';
import HeroBanner from '../components/HeroBanner';
import HomepageFeatures from '../components/HomepageFeatures';
import DurabilityTable from '../components/DurabilityTable';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import QuickExample from '../components/QuickExample';

export default function Home(): React.JSX.Element {
  return (
    <Layout
      title="An embedded database for AI agents"
      description="Six primitives, branch isolation, and deterministic replay.">
      <HeroBanner />
      <main>
        <HomepageFeatures />
        <DurabilityTable />
        <QuickExample />
        <ArchitectureDiagram />
      </main>
    </Layout>
  );
}
