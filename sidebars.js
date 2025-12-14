/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '🖥️ 컴퓨터 시스템',
      items: [
        '01-computer-system/01-cpu-basics',
        '01-computer-system/02-memory-structure',
        '01-computer-system/03-process-thread',
      ],
    },
    {
      type: 'category',
      label: '📊 자료구조',
      items: [
        '02-data-structure/intro',
      ],
    },
    {
      type: 'category',
      label: '🌐 네트워크',
      items: [
        '03-network/intro',
      ],
    },
    {
      type: 'category',
      label: '🗄️ 데이터베이스',
      items: [
        '04-database/intro',
      ],
    },
    {
      type: 'category',
      label: '🐳 인프라/DevOps',
      items: [
        '05-infrastructure/intro',
      ],
    },
    {
      type: 'category',
      label: '🔒 보안',
      items: [
        '06-security/intro',
      ],
    },
  ],
};

export default sidebars;
