// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CS 학습 노트',
  tagline: '비전공 개발자의 CS 기초 정복기 🚀',
  favicon: 'img/favicon.ico',

  // GitHub Pages 배포용 설정
  url: 'https://atototo.github.io',
  baseUrl: '/cs-study/',

  // GitHub Pages 설정
  organizationName: 'atototo',
  projectName: 'cs-study',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/atototo/cs-study/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.jpg',
      navbar: {
        title: 'CS 학습 노트',
        logo: {
          alt: 'CS Study Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '학습 노트',
          },
          {
            href: 'https://github.com/atototo/cs-study',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '학습 노트',
            items: [
              {
                label: '시작하기',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: '링크',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/atototo',
              },
              {
                label: '포트폴리오',
                href: 'https://atototo.github.io/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} CS Study. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['java', 'bash', 'json'],
      },
    }),
};

export default config;
