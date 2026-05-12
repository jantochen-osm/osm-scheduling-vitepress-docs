# 03 样例数据准备

样例数据用于支撑 Stage 1 MVP 的开发、测试和业务验证。

## 1. 样例数据目标

样例数据不是越多越好，而是要覆盖关键场景和异常。

建议至少准备：

```text
20~50 条 MO 订单样例
5~10 个 ItemId（成品料号）
3F3~3F6 产线主数据
对应 Assembly UPPH
至少 2 周工作日历
```

## 2. 订单样例要求

订单样例应覆盖：

| 类型 | 数量建议 | 目的 |
| --- | --- | --- |
| 正常 EE Assembly 订单 | 10~20 条 | 验证 Stage 1 正常排产 |
| DlvDate 不同的订单 | 5~10 条 | 验证交期排序 |
| 数量较大的订单 | 3~5 条 | 验证跨日排产 |
| Qty 异常订单 | 1~2 条 | 验证数量异常 |
| DlvDate 为空订单 | 1~2 条 | 验证交期异常 |
| OSM_Category 为空或未知 | 1~2 条 | 验证分类异常 |
| 缺路线订单 | 1~2 条 | 验证工艺异常 |
| 缺 UPPH 订单 | 1~2 条 | 验证产能异常 |

## 3. 工艺路线样例要求

Stage 1 最少需要 Assembly 工段。

示例：

| ItemId | RouteId | OperationSeq | OperationCode | OperationName | ProcessType |
| --- | --- | --- | --- | --- | --- |
| ITEM001 | R001 | 10 | ASM | Assembly | Assembly |
| ITEM002 | R002 | 10 | ASM | Assembly | Assembly |

Stage 2 才需要扩展多工段：

| ItemId | RouteId | OperationSeq | OperationCode | OperationName | ProcessType |
| --- | --- | --- | --- | --- | --- |
| ITEM003 | R003 | 10 | CUT | Cutting | Cutting |
| ITEM003 | R003 | 20 | ASM | Assembly | Assembly |
| ITEM003 | R003 | 30 | PKG | Package | Package |

## 4. 产线样例要求

Stage 1 必须准备：

| lineCode | lineGroup | processTypeSupported | isSchedulable | isTrialLine |
| --- | --- | --- | --- | --- |
| 3F3 | EE | Assembly | true | false |
| 3F4 | EE | Assembly | true | false |
| 3F5 | EE | Assembly | true | false |
| 3F6 | EE | Assembly | true | false |

## 5. UPPH 样例要求

| lineCode | ItemId | processType | UPPH | 说明 |
| --- | --- | --- | --- | --- |
| 3F3 | ITEM001 | Assembly | 100 | 人均 UPPH 示例 |
| 3F4 | ITEM001 | Assembly | 90 | 人均 UPPH 示例 |
| 3F5 | ITEM001 | Assembly | 95 | 人均 UPPH 示例 |
| 3F6 | ITEM001 | Assembly | 80 | 人均 UPPH 示例 |

::: warning 重要
Stage 0 已确认 UPPH 的业务含义：
- 人均每小时产出（Units Per Person Per Hour）
- 产能公式：日可产数量 = UPPH × 人数 × 工作小时
:::
## 6. 日历样例要求

至少准备连续 2 周日历：

| date | dateType | defaultWorkHours | 说明 |
| --- | --- | --- | --- |
| 2026-05-11 | Workday | 10 | 正常工作日 |
| 2026-05-16 | Saturday | 8 | 周六 |
| 2026-05-17 | Sunday | 0 | 周日 |

## 7. 输出物

建议输出：

```text
stage0_sample_mo_orders.xlsx
stage0_sample_route_operations.xlsx
stage0_sample_lines.xlsx
stage0_sample_capacity.xlsx
stage0_sample_calendar.xlsx
```
