# OSM 排产系统 VitePress 文档

这是 OSM 产线排产系统设计书的 VitePress Markdown 版本。

## 启动方式

```bash
npm install
npm run docs:dev
```

## 构建静态站点

```bash
npm run docs:build
npm run docs:preview
```

## 目录说明

```text
docs/
├── index.md                         # 首页
├── guide/                           # 总体设计说明
├── stages/                          # 阶段化实现路径
│   ├── stage-0/
│   ├── stage-1/
│   ├── stage-2/
│   ├── stage-3/
│   ├── stage-4/
│   ├── stage-5/
│   └── stage-6/
├── rules/                           # 业务规则与优先级
├── data-model/                      # 数据模型
├── engine/                          # 排产引擎
├── reference/                       # 异常、指标、待确认事项
└── .vitepress/config.mts            # VitePress 配置
```
