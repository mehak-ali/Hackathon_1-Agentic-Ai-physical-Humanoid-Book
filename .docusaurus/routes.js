import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', 'a5a'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', 'f8b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'd2d'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', '265'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '027'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', 'c78'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', 'df7'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'aa5'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '149'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '86d'),
            routes: [
              {
                path: '/docs/',
                component: ComponentCreator('/docs/', 'a8c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/plan',
                component: ComponentCreator('/docs/plan', 'd49'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/specification',
                component: ComponentCreator('/docs/specification', 'b5e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/specs/book-outline/plan',
                component: ComponentCreator('/docs/specs/book-outline/plan', '1cb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/specs/book-outline/tasks',
                component: ComponentCreator('/docs/specs/book-outline/tasks', '829'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/specs/physical-ai-book/plan',
                component: ComponentCreator('/docs/specs/physical-ai-book/plan', 'bc3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/specs/physical-ai-book/spec',
                component: ComponentCreator('/docs/specs/physical-ai-book/spec', '72f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/specs/physical-ai-book/tasks',
                component: ComponentCreator('/docs/specs/physical-ai-book/tasks', 'c3a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tasks',
                component: ComponentCreator('/docs/tasks', 'b4b'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '19a'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', '679'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
