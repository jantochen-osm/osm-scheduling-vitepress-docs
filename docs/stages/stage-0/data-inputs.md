# 输入数据与字段清单

## 数据来源说明

阶段 0 需要从以下来源收集原始数据，并进行口径统一：

| 数据来源 | 说明 |
| --- | --- |
| AX 2012 ERP | 订单、状态、Pool、料号、路线等核心业务数据 |
| 中间库 / 数仓 | AX 数据同步后的标准化副本，建议以此为优先读取源 |
| OSM 系统补充字段 | OSM_Category、产线主数据、UPPH、日历例外等，由 OSM 系统自行维护 |

---

## 1. 订单数据（MO Orders）

**来源**：AX 2012 Production Orders / 中间库

| 字段名 | 含义 | 类型 | 是否必填 | 口径说明 |
| --- | --- | --- | --- | --- |
| MO | 制造订单号 | String | ✅ | AX 中 ProdId |
| FG Item Code | 成品料号 | String | ✅ | AX 中 ItemId（成品层） |
| Qty | 计划数量 | Decimal | ✅ | 单位：PCS |
| DlvDate | 交货日期 | Date | ✅ | AX 中 DlvDate 或 DeadlineDate，需确认取哪个 |
| Status | 订单状态 | Enum | ✅ | 需确认状态枚举值（例：Created / Released / Ended） |
| Pool | 订单池 | String | ✅ | 枚举值：SC_YBSC_F3 / SC_YBSC_HT / SCD_HT_CC / SCD_HT_F3 |
| OSM_Category | EE / ESG 分类 | Enum | ✅ | AX 是否有此字段？还是从产品主数据派生？ |
| Customer | 客户代码 | String | 建议 | 用于 ESG 专线匹配（如 Shure / Amazon） |
| Brand | 品牌 | String | 建议 | 可能与 Customer 重合，需确认 |
| RouteId | 工艺路线号 | String | ✅ | 关联工段顺序 |

::: tip 口径确认项
- `DlvDate` 是否即为排产截止日，还是仅为客户需求日？如果有内部加工完成日，应使用哪个？
- `OSM_Category` 的来源：是 AX 字段、还是通过产品主数据分类规则派生？
:::

---

## 2. 工艺路线数据（Route Operations）

**来源**：AX 2012 Route / Route Operations

| 字段名 | 含义 | 类型 | 是否必填 | 口径说明 |
| --- | --- | --- | --- | --- |
| FG Item Code | 成品料号 | String | ✅ | 与 MO 关联键 |
| RouteId | 路线号 | String | ✅ | 同一产品可能有多版本路线 |
| OperationSeq | 工序序号 | Integer | ✅ | 决定工段先后顺序 |
| OperationCode | 工序代码 | String | ✅ | 例：Assembly / Package / SMT |
| ProcessType | 工段类型 | Enum | ✅ | 与产线的工段能力做匹配 |

::: warning 注意
需确认 AX 中是否存在一个料号对应多条有效路线的情况，以及如何选择"当前版本"路线。
:::

---

## 3. 产线主数据（Production Lines）

**来源**：OSM 系统自建维护

| 字段名 | 含义 | 类型 | 是否必填 | 口径说明 |
| --- | --- | --- | --- | --- |
| lineCode | 产线代码 | String | ✅ | 例：3F3 / 4F1 |
| lineGroup | 产线分类 | Enum | ✅ | EE / ESG |
| floor | 楼层 | String | ✅ | 1F / 3F / 4F |
| isSchedulable | 是否纳入正式排产 | Boolean | ✅ | false = 试产产线 |
| isTrialLine | 是否试产线 | Boolean | ✅ | 与 isSchedulable 配合使用 |
| supportedProcessTypes | 支持的工段类型 | List | ✅ | 例：[Assembly] / [Package] / [Assembly, Package] |

---

## 4. 产能参数（UPPH）

**来源**：OSM 系统自建维护 / 工程部提供

| 字段名 | 含义 | 类型 | 是否必填 | 口径说明 |
| --- | --- | --- | --- | --- |
| lineCode | 产线代码 | String | ✅ | |
| FG Item Code | 成品料号 | String | ✅ | 料号级 UPPH |
| processType | 工段类型 | String | ✅ | 同一料号不同工段 UPPH 可能不同 |
| UPPH | 每小时产量 | Decimal | ✅ | 单位：PCS/H |
| laborQty | 人员数量 | Integer | 建议 | 用于区分线体 UPPH vs 人均 UPPH |
| efficiency | 效率系数 | Decimal | 建议 | 默认 1.0，可配置 |

::: tip 口径确认项
**UPPH 口径**是阶段 0 最关键的确认项之一：
- 线体 UPPH = 整条产线每小时总产量（推荐使用）
- 人均 UPPH = 每人每小时产量（需乘以人数才能得到产线产能）
:::

---

## 5. 工作日历（Work Calendar）

**来源**：OSM 系统自建维护

| 字段名 | 含义 | 类型 | 是否必填 | 口径说明 |
| --- | --- | --- | --- | --- |
| date | 日期 | Date | ✅ | |
| dateType | 日期类型 | Enum | ✅ | 正常工作日 / 周六 / 周日 / 法定节假日 / 节假日前一天 / 月末最后工作日 |
| defaultWorkHours | 默认工时（小时） | Decimal | ✅ | 按 dateType 配置默认值 |

**默认日历规则**（需业务确认）：

| 日期类型 | 默认工时 |
| --- | --- |
| 正常工作日 | 10h |
| 周六 | 8h |
| 周日 | 0h |
| 大型节假日前一天 | 8h |
| 每月最后一个工作日 | 8h |
| 法定节假日 | 0h |
