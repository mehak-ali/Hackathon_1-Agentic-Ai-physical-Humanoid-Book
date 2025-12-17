import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '01a'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '562'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '1f4'),
            routes: [
              {
                path: '/docs/',
                component: ComponentCreator('/docs/', '4a8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/ai-robot-brain/constitution',
                component: ComponentCreator('/docs/ai-robot-brain/constitution', '093'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/ai-robot-brain/introduction-to-ai-robot-brain',
                component: ComponentCreator('/docs/ai-robot-brain/introduction-to-ai-robot-brain', '851'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/ai-robot-brain/lesson1-isaac-sim',
                component: ComponentCreator('/docs/ai-robot-brain/lesson1-isaac-sim', '80c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/ai-robot-brain/lesson2-isaac-ros-perception',
                component: ComponentCreator('/docs/ai-robot-brain/lesson2-isaac-ros-perception', '183'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/ai-robot-brain/lesson3-nav2-humanoid',
                component: ComponentCreator('/docs/ai-robot-brain/lesson3-nav2-humanoid', 'a1b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/ai-robot-brain/plan',
                component: ComponentCreator('/docs/ai-robot-brain/plan', 'f94'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/ai-robot-brain/spec',
                component: ComponentCreator('/docs/ai-robot-brain/spec', '5e8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/ai-robot-brain/tasks',
                component: ComponentCreator('/docs/ai-robot-brain/tasks', '474'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/chapter2',
                component: ComponentCreator('/docs/chapter2', '852'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/chapter3',
                component: ComponentCreator('/docs/chapter3', '1f4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/digital-twin/constitution',
                component: ComponentCreator('/docs/digital-twin/constitution', '83c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/digital-twin/introduction-to-digital-twin',
                component: ComponentCreator('/docs/digital-twin/introduction-to-digital-twin', '3ed'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/digital-twin/lesson1-intro-to-gazebo',
                component: ComponentCreator('/docs/digital-twin/lesson1-intro-to-gazebo', '9b6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/digital-twin/lesson2-simulating-the-world',
                component: ComponentCreator('/docs/digital-twin/lesson2-simulating-the-world', '998'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/digital-twin/lesson3-simulating-sensors',
                component: ComponentCreator('/docs/digital-twin/lesson3-simulating-sensors', '708'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/digital-twin/lesson4-hifi-sim-with-unity',
                component: ComponentCreator('/docs/digital-twin/lesson4-hifi-sim-with-unity', '85a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/digital-twin/plan',
                component: ComponentCreator('/docs/digital-twin/plan', 'd1e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/digital-twin/spec',
                component: ComponentCreator('/docs/digital-twin/spec', '589'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/digital-twin/tasks',
                component: ComponentCreator('/docs/digital-twin/tasks', 'd3a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/plan',
                component: ComponentCreator('/docs/plan', '68b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/robotic-nervous-system/constitution',
                component: ComponentCreator('/docs/robotic-nervous-system/constitution', 'ba8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/robotic-nervous-system/introduction-to-rns',
                component: ComponentCreator('/docs/robotic-nervous-system/introduction-to-rns', 'c7c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/robotic-nervous-system/lesson1-intro-to-ros2',
                component: ComponentCreator('/docs/robotic-nervous-system/lesson1-intro-to-ros2', '4e8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/robotic-nervous-system/lesson2-ros2-fundamentals',
                component: ComponentCreator('/docs/robotic-nervous-system/lesson2-ros2-fundamentals', '111'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/robotic-nervous-system/lesson3-python-agents-with-rclpy',
                component: ComponentCreator('/docs/robotic-nervous-system/lesson3-python-agents-with-rclpy', 'dab'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/robotic-nervous-system/lesson4-urdf-for-humanoids',
                component: ComponentCreator('/docs/robotic-nervous-system/lesson4-urdf-for-humanoids', '3e3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/robotic-nervous-system/plan',
                component: ComponentCreator('/docs/robotic-nervous-system/plan', '74b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/robotic-nervous-system/spec',
                component: ComponentCreator('/docs/robotic-nervous-system/spec', 'e9f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/robotic-nervous-system/tasks',
                component: ComponentCreator('/docs/robotic-nervous-system/tasks', '1ba'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/sp.constitution',
                component: ComponentCreator('/docs/sp.constitution', 'eb7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/sp.implement',
                component: ComponentCreator('/docs/sp.implement', 'd70'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/sp.plan',
                component: ComponentCreator('/docs/sp.plan', 'aaa'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/sp.specify',
                component: ComponentCreator('/docs/sp.specify', 'df6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/sp.task',
                component: ComponentCreator('/docs/sp.task', '1cc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/specification',
                component: ComponentCreator('/docs/specification', 'bec'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/specs/book-outline/plan',
                component: ComponentCreator('/docs/specs/book-outline/plan', '13d'),
                exact: true
              },
              {
                path: '/docs/specs/book-outline/tasks',
                component: ComponentCreator('/docs/specs/book-outline/tasks', '887'),
                exact: true
              },
              {
                path: '/docs/specs/physical-ai-book/plan',
                component: ComponentCreator('/docs/specs/physical-ai-book/plan', '2f8'),
                exact: true
              },
              {
                path: '/docs/specs/physical-ai-book/spec',
                component: ComponentCreator('/docs/specs/physical-ai-book/spec', 'c90'),
                exact: true
              },
              {
                path: '/docs/specs/physical-ai-book/tasks',
                component: ComponentCreator('/docs/specs/physical-ai-book/tasks', '2bd'),
                exact: true
              },
              {
                path: '/docs/tasks',
                component: ComponentCreator('/docs/tasks', 'd41'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/vision-language-action/constitution',
                component: ComponentCreator('/docs/vision-language-action/constitution', '9a2'),
                exact: true
              },
              {
                path: '/docs/vision-language-action/introduction-to-vla',
                component: ComponentCreator('/docs/vision-language-action/introduction-to-vla', 'd93'),
                exact: true
              },
              {
                path: '/docs/vision-language-action/lesson1-whisper-voice-commands',
                component: ComponentCreator('/docs/vision-language-action/lesson1-whisper-voice-commands', '70d'),
                exact: true
              },
              {
                path: '/docs/vision-language-action/lesson2-llm-cognitive-planning',
                component: ComponentCreator('/docs/vision-language-action/lesson2-llm-cognitive-planning', 'c9b'),
                exact: true
              },
              {
                path: '/docs/vision-language-action/lesson3-capstone-autonomous-humanoid',
                component: ComponentCreator('/docs/vision-language-action/lesson3-capstone-autonomous-humanoid', 'df6'),
                exact: true
              },
              {
                path: '/docs/vision-language-action/plan',
                component: ComponentCreator('/docs/vision-language-action/plan', 'e5e'),
                exact: true
              },
              {
                path: '/docs/vision-language-action/spec',
                component: ComponentCreator('/docs/vision-language-action/spec', '7ef'),
                exact: true
              },
              {
                path: '/docs/vision-language-action/tasks',
                component: ComponentCreator('/docs/vision-language-action/tasks', 'a9b'),
                exact: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
