---
layout: home
hero:
  name: OSM 排产系统设计书
  text: 阶段化实现路径与系统蓝图
  tagline: 从 EE Assembly 单场景 MVP 出发，逐步扩展到 EE/ESG、多工段、日历例外、人工干预与高级优化。
  actions:
    - theme: brand
      text: 查看阶段路径
      link: /stages/
    - theme: alt
      text: 查看总体架构
      link: /guide/architecture
features:
  - title: 阶段化演进
    details: 阶段 0 到阶段 6，先简单场景闭环，再逐步扩展多场景。
  - title: 规则驱动
    details: 优先保证业务规则正确、结果可解释，再引入高级优化。
  - title: LLM 可读
    details: 使用清晰的输入、处理、输出、验收、衔接结构，方便模型继续扩展。
---

## 文档定位

本 VitePress 文档用于指导 OSM 产线排产系统的阶段化建设。系统以 **MO 制造订单** 为排产对象，以 **MO + 工段 + 日期 + 产线** 为初始排产粒度。

## 推荐阅读顺序

1. [建设原则](/guide/principles)
2. [系统范围](/guide/scope)
3. [总体架构](/guide/architecture)
4. [阶段化实现路径](/stages/)
5. [数据模型](/data-model/)
6. [排产引擎](/engine/)
7. [规则中心](/rules/)
8. [异常与指标](/reference/)
