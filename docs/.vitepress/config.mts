import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'OSM 排产系统设计书',
  description: 'OSM 产线排产系统阶段化实现路径与系统蓝图',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '总览', link: '/' },
      { text: '阶段路径', link: '/stages/' },
      { text: '数据模型', link: '/data-model/' },
      { text: '排产引擎', link: '/engine/' },
      { text: '规则中心', link: '/rules/' },
      { text: '参考', link: '/reference/' }
    ],
    sidebar: {
      '/stages/': [
        {
          text: '阶段化实现路径',
          items: [
            { text: '阶段总览', link: '/stages/' },
            {
              text: '阶段 0：业务边界与数据底座确认',
              collapsed: false,
              items: [
                { text: '阶段入口', link: '/stages/stage-0/' },
                { text: '00 阶段总览', link: '/stages/stage-0/00-overview' },
                { text: '01 业务边界确认', link: '/stages/stage-0/01-business-boundary' },
                { text: '02 数据源与字段映射', link: '/stages/stage-0/02-data-source-mapping' },
                { text: '03 样例数据准备', link: '/stages/stage-0/03-sample-data' },
                { text: '04 主数据基线', link: '/stages/stage-0/04-master-data-baseline' },
                { text: '05 工艺路线与工段基线', link: '/stages/stage-0/05-route-operation-baseline' },
                { text: '06 产能与日历口径', link: '/stages/stage-0/06-capacity-calendar-baseline' },
                { text: '06a 产能工时池模型', link: '/stages/stage-0/06a-capacity-hour-pool' },
                { text: '07 异常字典设计', link: '/stages/stage-0/07-exception-dictionary' },
                { text: '08 验证清单', link: '/stages/stage-0/08-validation-checklist' },
                { text: '09 交付物模板', link: '/stages/stage-0/09-deliverables' },
                { text: '10 工作坊议程', link: '/stages/stage-0/10-workshop-agenda' },
              ]
            },
            { text: '阶段 1：EE Assembly 单场景 MVP', link: '/stages/stage-1/' },
            { text: '阶段 2：EE 多工段与完整规则', link: '/stages/stage-2/' },
            { text: '阶段 3：ESG 专线场景扩展', link: '/stages/stage-3/' },
            { text: '阶段 4：日历例外与可解释性', link: '/stages/stage-4/' },
            { text: '阶段 5：人工干预与版本管理', link: '/stages/stage-5/' },
            { text: '阶段 6：高级约束与优化', link: '/stages/stage-6/' }
          ]
        }
      ],
      '/guide/': [
        {
          text: '总体设计',
          items: [
            { text: '文档目标', link: '/guide/' },
            { text: '系统范围', link: '/guide/scope' },
            { text: '总体架构', link: '/guide/architecture' },
            { text: '建设原则', link: '/guide/principles' }
          ]
        }
      ],
      '/data-model/': [
        {
          text: '数据模型',
          items: [
            { text: '数据分层', link: '/data-model/' },
            { text: '核心对象', link: '/data-model/core-objects' },
            { text: '字段建议', link: '/data-model/fields' }
          ]
        }
      ],
      '/engine/': [
        {
          text: '排产引擎',
          items: [
            { text: '引擎总览', link: '/engine/' },
            { text: '基础算法', link: '/engine/basic-algorithm' },
            { text: '产能计算', link: '/engine/capacity' },
            { text: '产线选择策略', link: '/engine/line-selection' }
          ]
        }
      ],
      '/rules/': [
        {
          text: '规则中心',
          items: [
            { text: '规则总览', link: '/rules/' },
            { text: 'OSM 业务规则基线', link: '/rules/osm-baseline' },
            { text: '规则优先级', link: '/rules/priority' }
          ]
        }
      ],
      '/reference/': [
        {
          text: '参考资料',
          items: [
            { text: '参考总览', link: '/reference/' },
            { text: '异常处理设计', link: '/reference/exceptions' },
            { text: '评价指标', link: '/reference/metrics' },
            { text: '待确认事项', link: '/reference/tbd' },
            { text: 'LLM 可读规范', link: '/reference/llm-readable' }
          ]
        }
      ]
    },
    socialLinks: [],
    search: {
      provider: 'local'
    },
    outline: {
      level: [2, 3],
      label: '本页目录'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    lastUpdatedText: '最后更新',
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部'
  }
})
