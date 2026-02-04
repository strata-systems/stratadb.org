import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/index',
        'getting-started/installation',
        'getting-started/first-database',
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      items: [
        'concepts/index',
        'concepts/primitives',
        'concepts/value-types',
        'concepts/branches',
        'concepts/transactions',
        'concepts/durability',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/index',
        {
          type: 'category',
          label: 'Primitives',
          items: [
            'guides/kv-store',
            'guides/event-log',
            'guides/state-cell',
            'guides/json-store',
            'guides/vector-store',
          ],
        },
        {
          type: 'category',
          label: 'Organization & Isolation',
          items: [
            'guides/branch-management',
            'guides/spaces',
          ],
        },
        {
          type: 'category',
          label: 'Cross-Cutting',
          items: [
            'guides/sessions-and-transactions',
            'guides/search',
            'guides/error-handling',
            'guides/observability',
            'guides/database-configuration',
            'guides/branch-bundles',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Cookbook',
      items: [
        'cookbook/index',
        'cookbook/agent-state-management',
        'cookbook/multi-agent-coordination',
        'cookbook/rag-with-vectors',
        'cookbook/deterministic-replay',
        'cookbook/ab-testing-with-branches',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/index',
        'reference/api-quick-reference',
        'reference/command-reference',
        'reference/configuration-reference',
        'reference/error-reference',
        'reference/value-type-reference',
      ],
    },
    'faq',
    'troubleshooting',
  ],
};

export default sidebars;
