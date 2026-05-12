# 07 异常字典设计

异常字典用于让系统和业务人员对“为什么不能排”形成共同语言。

Stage 0 应先定义异常类型，而不是等系统开发后再补。

## 1. 异常分级

| 级别 | 含义 | 处理方式 |
| --- | --- | --- |
| BLOCKER | 阻断排产 | 不生成排产结果 |
| WARNING | 提醒风险 | 可生成结果，但需要提示 |
| INFO | 信息提示 | 仅记录，不影响排产 |

## 2. 订单异常

| exceptionType | 触发条件 | 级别 | 建议动作 |
| --- | --- | --- | --- |
| MISSING_DLV_DATE | DlvDate 为空 | BLOCKER | 补交期 |
| INVALID_QTY | QtySched ≤ 0 | BLOCKER | 确认订单数量 |
| UNKNOWN_OSM_CATEGORY | OSM_Category 为空或不是 EE/ESG | BLOCKER | 维护分类 |
| POOL_NOT_INCLUDED | ProdPoolId 不在白名单 | INFO | 不进入排产池 |
| STATUS_FINISHED | ProdStatus 已结束 | INFO | 不进入排产池 |

## 3. 工艺异常

| exceptionType | 触发条件 | 级别 | 建议动作 |
| --- | --- | --- | --- |
| MISSING_ROUTE | ItemId 找不到路线 | BLOCKER | 维护路线 |
| MISSING_ASSEMBLY_OPERATION | Stage 1 找不到 Assembly 工段 | BLOCKER | 确认路线或 ProcessType 映射 |
| UNKNOWN_PROCESS_TYPE | 工段无法标准化 | BLOCKER | 维护 ProcessType 字典 |
| MISSING_OPERATION_SEQ | 工段顺序为空 | WARNING/BLOCKER | Stage 1 可不阻断，Stage 2 阻断 |

## 4. 规则异常

| exceptionType | 触发条件 | 级别 | 建议动作 |
| --- | --- | --- | --- |
| NO_AVAILABLE_LINE | 找不到候选产线 | BLOCKER | 补产线规则 |
| LINE_RULE_CONFLICT | 命中多个互斥规则 | BLOCKER | 调整规则优先级 |
| TRIAL_LINE_FOR_MASS_ORDER | 正式订单命中试产线 | BLOCKER | 检查产线状态 |

## 5. 产能异常

| exceptionType | 触发条件 | 级别 | 建议动作 |
| --- | --- | --- | --- |
| MISSING_UPPH | 找不到 UPPH | BLOCKER | 维护 UPPH 或人工放行 |
| INVALID_UPPH | UPPH <= 0 | BLOCKER | 修正 UPPH |
| ZERO_WORK_HOURS | 当天工时为 0 | INFO | 跳过日期 |
| MISSING_CALENDAR | 找不到日历 | WARNING | 使用默认日历或补日历 |

## 6. 结果异常

| exceptionType | 触发条件 | 级别 | 建议动作 |
| --- | --- | --- | --- |
| LATE_ORDER | FinishDate > DlvDate | WARNING | 关注逾期风险 |
| QTY_NOT_FULLY_ALLOCATED | 计划数量小于订单数量 | BLOCKER | 检查产能分配 |
| OPERATION_SEQUENCE_VIOLATION | 后工段早于前工段 | BLOCKER | 修正排产逻辑 |

## 7. 异常输出字段

```text
runId
ProdId
ItemId
operationCode
exceptionType
severity
message
suggestedAction
sourceModule
createdAt
```
