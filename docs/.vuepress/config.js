import { defineUserConfig } from 'vuepress'
import { defaultTheme } from 'vuepress'

export default defineUserConfig({
    base:'/ly-blog/',
    lang: 'zh-CN',
    title: 'LYJAVA',
    description: '学无止境',
    head: [
      ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    // 指定不加载的文件
    pagePatterns: ['**/*.md',  '!.vuepress', '!node_modules'],
    markdown: {
      lineNumbers: true
      // anchor: false,
      // links: false
      // false禁用表情
      // emoji: false
    },
    theme: defaultTheme({
      // 默认主题配置
      navbar: [
        {
          text: '首页',
          link: '/',
        },
        {
          text: '前端',
          link: '/front/',
        },
        {
          text: '后端',
          link: '/java/',
        },
        {
          text: '中间件',
          link: '/middleTools/',
        },
        {
          text: '微服务',
          link: '/microservices/',
        },
        {
          text: '运维',
          link: '/devops/',
        },
        {
          text: '面试',
          link: '/interview/',
        },
        {
          text: '关于',
          link: '/123',
        },
        {
          text: '在线工具',
          children: [
            {
              text: 'Maven中央仓库',
              link: 'https://mvnrepository.com/'
            },
            {
                text: 'PDFBox',
                link: 'https://pdfbox.apache.org/'
            },
            {
                text: 'NPM镜像站',
                link: 'https://npmmirror.com/'
            },
            {
                text: 'GitHub加速',
                link: 'https://ghproxy.com/'
            },
            {
                text: 'BootCDN',
                link: 'https://www.bootcdn.cn/'
            },
            {
                text: 'DaoCloud',
                link: 'https://hub.daocloud.io/'
            },
            {
                text: 'Redis命令',
                link: 'http://redisdoc.com/index.html'
            },
            {
                text: 'JetBrain激活',
                link: 'https://3.jetbra.in/'
            },
            {
                text: 'Google翻译',
                link: 'https://translate.google.cn/'
            },
            {
                text: '正则在线工具',
                link: 'https://c.runoob.com/front-end/854/'
            },
            {
                text: 'Google开发者',
                link: 'https://developers.google.cn/'
            }
          ]
        },
      ],
      lastUpdated: '最近更新',
      sidebar:{
        '/interview/':[
           'javaFoundation',
           '数据结构',
        ],
        '/middleTools/':[
          'redis',
        ]
      }
    }),
})
