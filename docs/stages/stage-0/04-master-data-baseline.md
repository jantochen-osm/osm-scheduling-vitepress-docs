# 04 主数据基线

主数据基线用于回答：**系统里有哪些稳定对象，它们的状态和属性是什么。**

## 1. 产线主数据

Stage 0 必须先维护 OSM 的产线清单。

### EE Line

| lineCode | lineGroup | 定位 | isSchedulable | isTrialLine | 备注 |
| --- | --- | --- | --- | --- | --- |
| 1F1 | EE | Package | true | false | Stage 2 引入 |
| 1F2 | EE | Package | true | false | Stage 2 引入 |
| 1F3 | EE | Package / 试产 | false | true | Stage 1 不排 |
| 3F1 | EE | 半成品 / 特定 Assembly | true | false | Stage 2 引入 |
| 3F2 | EE | 特定产品全工段 | true | false | Stage 2 引入 |
| 3F3 | EE | Assembly | true | false | Stage 1 引入 |
| 3F4 | EE | Assembly | true | false | Stage 1 引入 |
| 3F5 | EE | Assembly | true | false | Stage 1 引入 |
| 3F6 | EE | Assembly | true | false | Stage 1 引入 |

### ESG Line

| lineCode | lineGroup | 定位 | isSchedulable | isTrialLine | 备注 |
| --- | --- | --- | --- | --- | --- |
| 4F1 | ESG | Amazon | true | false | Stage 3 引入 |
| 4F2 | ESG | Chicha | true | false | Stage 3 引入 |
| 4F3 | ESG | 试产 | false | true | Stage 3 暂不排正式单 |
| 4F4 | ESG | Shure | true | false | Stage 3 引入 |
| 4F5 | ESG | 试产 | false | true | Stage 3 暂不排正式单 |
| 4F6 | ESG | Jano-Life | true | false | Stage 3 引入 |
| 4F7 | ESG | 待确认 | false | false | TBD |
| 4F8 | ESG | 待确认 | false | false | TBD |

## 2. 工段主数据

| ProcessType | 说明 | Stage 1 是否使用 | 备注 |
| --- | --- | --- | --- |
| Assembly | 装配 | 是 | Stage 1 核心工段 |
| Package | 包装 | 否 | Stage 2 引入 |
| Cutting | 裁切 | 否 | Stage 3/6 视 UPPH 情况处理 |
| SemiFinished | 半成品 | 否 | Stage 2 引入 |
| Inspection | 检验 | 否 | 后续确认是否纳入 |
| Rework | 返工 | 否 | 后续作为异常或独立场景 |

## 3. 产品主数据

Stage 0 不要求完整产品库，但至少要有样例产品：

| 字段 | 说明 |
| --- | --- |
| ItemId | 成品料号 |
| ProductName | 产品名称 |
| OSM_Category | EE / ESG |
| KeyAccount | 客户编码 |
| RouteId | 默认工艺路线 |
| IsSpecialLineProduct | 是否专线产品 |

## 4. 客户与品牌主数据

Stage 0 可先仅收集样例，不做完整规则。

后续 Stage 3 需要用于判断：

- Amazon → 4F1
- Chicha → 4F2，可能通过固定料号判断
- Shure → 4F4
- Jano-Life → 4F6

## 5. 主数据质量要求

```text
1. lineCode 全局唯一。
2. lineGroup 只允许 EE / ESG。
3. isSchedulable 必填。
4. isTrialLine 必填。
5. ProcessType 必须来自标准字典。
6. Stage 1 使用的 3F3~3F6 必须可排产。
```
