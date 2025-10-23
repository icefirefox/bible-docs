import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'My Bible Site',
  tagline: 'Read and Explore the Bible',
  favicon: 'img/favicon.ico',

  url: 'http://localhost',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',      // 首页直接显示文档
          sidebarPath: './sidebars.ts',
          editUrl: undefined,      // 去掉“Edit this page”链接
        },
        blog: false,               // 不需要博客
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'My Bible Site',
      logo: {
        alt: 'Bible Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'bibleSidebar',
          position: 'left',
          label: 'Bible',
        },
      ],
    },
    footer: undefined,            // 没有 footer
    colorMode: {
      // respectPrefersColorScheme: true,
      defaultMode: 'light',       // 默认日间模式
      disableSwitch: false,       // 是否允许用户切换，如果想让用户可以切换就设 false
      respectPrefersColorScheme: false, // 不跟随系统偏好
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
