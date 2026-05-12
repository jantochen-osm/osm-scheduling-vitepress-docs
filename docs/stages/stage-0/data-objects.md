# 数据对象设计

本页说明阶段 0 建议在数据库中创建的数据表结构。这些表是整个排产系统的数据底座，从阶段 0 起建，后续阶段在此基础上扩展字段。

::: tip 命名规范
- 输入类表（主数据、参数）以 `_inputs` 结尾
- 结果类表以 `_results` 以 `schedule_` 开头
- 使用 `snake_case` 命名风格
:::

---

## 核心输入表（阶段 0 必建）

### `mo_orders` — 制造订单

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| mo | VARCHAR | 制造订单号（主键候选） |
| fg_item_code | VARCHAR | 成品料号 |
| qty | DECIMAL | 计划数量（PCS） |
| dlv_date | DATE | 交货日期 |
| status | VARCHAR | 订单状态 |
| pool | VARCHAR | 订单池 |
| osm_category | VARCHAR | EE / ESG / NULL（异常） |
| customer | VARCHAR | 客户代码 |
| brand | VARCHAR | 品牌 |
| route_id | VARCHAR | 工艺路线号 |
| sync_time | DATETIME | 数据同步时间 |

---

### `route_operations` — 工艺路线与工段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| fg_item_code | VARCHAR | 成品料号 |
| route_id | VARCHAR | 路线号 |
| operation_seq | INTEGER | 工序序号（决定顺序） |
| operation_code | VARCHAR | 工序代码（Assembly / Package / SMT） |
| process_type | VARCHAR | 工段类型，用于产线匹配 |

---

### `production_lines` — 产线主数据

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| line_code | VARCHAR | 产线代码（主键） |
| line_group | VARCHAR | EE / ESG |
| floor | VARCHAR | 1F / 3F / 4F |
| is_schedulable | BOOLEAN | 是否纳入正式排产 |
| is_trial_line | BOOLEAN | 是否试产线 |
| supported_process_types | VARCHAR | 支持的工段类型（JSON 数组或逗号分隔） |

---

### `capacity_param_inputs` — 产能参数（UPPH）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| line_code | VARCHAR | 产线代码 |
| fg_item_code | VARCHAR | 成品料号 |
| process_type | VARCHAR | 工段类型 |
| upph | DECIMAL | 每小时产量（PCS/H，线体口径） |
| labor_qty | INTEGER | 人员数量（备用） |
| efficiency | DECIMAL | 效率系数（默认 1.0） |
| effective_date | DATE | 生效日期 |

---

### `work_calendar` — 通用工作日历

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| date | DATE | 日期（主键） |
| date_type | VARCHAR | 正常工作日 / 周六 / 周日 / 法定节假日 / 节前短工时 / 月末短工时 |
| default_work_hours | DECIMAL | 默认工时（小时） |

---

### `calendar_exception_inputs` — 日历例外（停线/加班）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| date | DATE | 日期 |
| line_code | VARCHAR | 产线代码（NULL 表示全线） |
| work_hours | DECIMAL | 实际工时（覆盖通用日历） |
| reason | VARCHAR | 原因说明 |
| priority | INTEGER | 优先级（高优先级覆盖低优先级） |

---

## 规则输入表（阶段 0 初建，阶段 1 完善）

### `rule_priority_inputs` — 订单筛选与排序规则

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rule_code | VARCHAR | 规则代码 |
| priority_type | VARCHAR | 规则类型（筛选 / 排序） |
| conditions | TEXT | 筛选条件（JSON 或 SQL 片段） |
| sort_field | VARCHAR | 排序字段 |
| sort_direction | VARCHAR | ASC / DESC |

---

### `rule_line_inputs` — 产线映射与专线规则

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rule_code | VARCHAR | 规则代码 |
| line_group | VARCHAR | EE / ESG |
| process_type | VARCHAR | 工段类型 |
| fg_item_code_include | TEXT | 料号白名单（JSON 数组） |
| customer_include | TEXT | 客户白名单（JSON 数组） |
| candidate_lines | TEXT | 候选产线列表（JSON 数组） |

---

## 排产结果表（阶段 1 使用，阶段 0 提前建结构）

### `schedule_runs` — 排产批次

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| run_id | VARCHAR | 批次 ID（主键） |
| run_type | VARCHAR | 自动排产 / 手动触发 |
| status | VARCHAR | Running / Done / Failed |
| start_time | DATETIME | 开始时间 |
| end_time | DATETIME | 结束时间 |
| rule_version | VARCHAR | 使用的规则版本号 |

---

### `schedule_results` — 排产结果明细

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| run_id | VARCHAR | 关联排产批次 |
| mo | VARCHAR | 制造订单号 |
| operation_code | VARCHAR | 工段 |
| line_code | VARCHAR | 排定产线 |
| plan_date | DATE | 排定日期 |
| plan_qty | DECIMAL | 当日计划数量 |
| start_date | DATE | 预计开始日期 |
| finish_date | DATE | 预计完成日期 |
| is_late | BOOLEAN | 是否逾期 |

---

### `schedule_exceptions` — 异常清单

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| run_id | VARCHAR | 关联排产批次 |
| mo | VARCHAR | 制造订单号 |
| exception_type | VARCHAR | 缺路线 / 缺 UPPH / 无产线 / 逾期 等 |
| exception_message | TEXT | 详细描述 |
| severity | VARCHAR | ERROR / WARNING / INFO |
| suggested_action | TEXT | 建议操作 |

---

### `schedule_rule_trace` — 规则命中与解释记录

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| run_id | VARCHAR | 关联排产批次 |
| mo | VARCHAR | 制造订单号 |
| operation_code | VARCHAR | 工段 |
| matched_rule_code | VARCHAR | 命中的规则代码 |
| reason | TEXT | 命中原因说明 |
| selected_line | VARCHAR | 最终选择的产线 |
