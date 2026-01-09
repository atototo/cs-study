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
    {
      type: 'category',
      label: '📝 정보처리기사',
      link: {
        type: 'doc',
        id: '정보처리기사/intro',
      },
      items: [
        {
          type: 'category',
          label: '1과목: 소프트웨어 설계',
          link: {
            type: 'doc',
            id: '정보처리기사/소프트웨어설계/intro',
          },
          items: [
            '정보처리기사/소프트웨어설계/요구사항확인',
            '정보처리기사/소프트웨어설계/화면설계',
            '정보처리기사/소프트웨어설계/애플리케이션설계',
          ],
        },
        {
          type: 'category',
          label: '2과목: 소프트웨어 개발',
          items: ['정보처리기사/소프트웨어개발/intro'],
        },
        {
          type: 'category',
          label: '3과목: 데이터베이스 구축',
          items: ['정보처리기사/데이터베이스구축/intro'],
        },
        {
          type: 'category',
          label: '4과목: 프로그래밍 언어 활용',
          items: ['정보처리기사/프로그래밍언어활용/intro'],
        },
        {
          type: 'category',
          label: '5과목: 정보시스템 구축관리',
          items: ['정보처리기사/정보시스템구축관리/intro'],
        },
      ],
    },
  ],
};

module.exports = sidebars;