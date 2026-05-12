# 推荐核心数据对象

| 对象 | 关键字段 | 说明 |
| --- | --- | --- |
| mo_orders | MO, FG Item Code, Qty, DlvDate, Status, Pool, OSM_Category, Customer, Brand | 待排产订单 |
| route_operations | FG Item Code, RouteId, OperationSeq, OperationCode, ProcessType | 产品工艺路线与工段顺序 |
| production_lines | lineCode, lineGroup, floor, isSchedulable, isTrialLine | 产线主数据 |
| capacity_param_inputs | lineCode, FG Item Code, processType, UPPH, laborQty, efficiency | 产能参数 |
| work_calendar | date, dateType, defaultWorkHours | 通用工作日历 |
| calendar_exception_inputs | date, lineCode, workHours, reason, priority | 日历例外、停线、加班 |
| rule_priority_inputs | ruleCode, priorityType, conditions, sortField, sortDirection | 订单筛选与排序规则 |
| rule_line_inputs | ruleCode, lineGroup, processType, fgItemCodeInclude, customerInclude, candidateLines | 产线映射与专线规则 |
| schedule_runs | runId, runType, status, startTime, endTime, ruleVersion | 排产批次 |
| schedule_results | runId, MO, operationCode, lineCode, planDate, planQty, startDate, finishDate, isLate | 排产结果明细 |
| schedule_exceptions | runId, MO, exceptionType, exceptionMessage, severity, suggestedAction | 异常清单 |
| schedule_rule_trace | runId, MO, operationCode, matchedRuleCode, reason, selectedLine | 规则命中与解释记录 |
