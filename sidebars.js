/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '💻 컴퓨터 시스템',
      items: [
        'computer-system/operating-system',
        'computer-system/lock-and-synchronization',
        'computer-system/cpu-basics',
        'computer-system/memory-structure',
        'computer-system/process-thread',
      ],
    },
    {
      type: 'category',
      label: '📊 자료구조 & 알고리즘',
      items: ['data-structure/intro'],
    },
    {
      type: 'category',
      label: '🌐 네트워크',
      items: ['network/intro'],
    },
    {
      type: 'category',
      label: '🗄️ 데이터베이스',
      items: ['database/intro'],
    },
    {
      type: 'category',
      label: '🐳 인프라 & DevOps',
      items: ['infrastructure/intro'],
    },
    {
      type: 'category',
      label: '🔒 보안',
      items: ['security/intro'],
    },
  ],
};

module.exports = sidebars;