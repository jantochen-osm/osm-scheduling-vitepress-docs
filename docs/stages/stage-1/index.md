# 阶段 1：EE Assembly 单场景 MVP

## 目标

完成最小排产闭环：能筛订单、查路线、匹配 3F3~3F6、计算日产能、生成结果和异常。

## 纳入范围

- OSM_Category = EE。
- ProcessType = Assembly。
- 候选产线 3F3~3F6。
- 按 DlvDate ASC 排序。
- 标准工作日 10 小时。
- 允许跨日，不允许跨线。

## 暂不纳入范围

- ESG。
- Package。
- Cutting。
- 试产线。
- 多工段顺序。
- 复杂日历例外。

## 输入数据

- MO, FG Item Code, Qty, DlvDate, Status, Pool, OSM_Category。
- FG Item Code 对应 Assembly 工段。
- 3F3~3F6 产线主数据。
- Assembly UPPH。
- 基础日历。

## 处理流程

```text
1. 筛选 EE 候选订单
2. 校验 Qty、DlvDate、FG Item Code
3. 按 DlvDate 升序排序
4. 查询工艺路线，只取 Assembly
5. 匹配候选产线 3F3~3F6
6. 计算每条线每日可用产能
7. 选择最早可完成产线
8. 逐日占用产能
9. 输出日明细结果
10. 输出异常清单
```

## 输出结果

- schedule_results 日明细。
- schedule_exceptions 异常清单。
- 每个 MO 的开始日、完成日、是否逾期。
- 每条结果的候选线和最终选择线。

## 验收标准

- 至少 80% 样例订单能生成合理结果，剩余进入可解释异常。
- 同一个 MO 同一工段不跨线。
- 跨日排产数量合计等于订单数量。
- 缺 UPPH、缺路线能进入异常。

## 与下一阶段的衔接

阶段 1 产出的排产引擎框架、结果表、异常表将被阶段 2 复用；阶段 2 只扩展规则与工段，不推翻阶段 1 逻辑。

## 主要风险与控制

- 样例过少导致规则无法验证：选择不同 FG Item Code 和不同数量订单。
- 业务认为第一版太简单：明确 MVP 是验证闭环，不是最终 APS。
