# 10 Stage 0 工作坊议程

Stage 0 建议通过 2~3 次工作坊完成业务确认。

## 工作坊 1：业务边界确认

### 参与角色

- 计划
- 生产
- IE / 工艺
- IT / 数据
- 项目负责人

### 目标

确认第一版 MVP 的范围。

### 议程

| 时间 | 主题 | 输出 |
| --- | --- | --- |
| 10 min | 项目目标说明 | 统一目标 |
| 20 min | OSM 订单筛选规则确认 | Pool / Status / DlvDate 规则 |
| 20 min | EE / ESG 产线范围确认 | Line Group 基线 |
| 30 min | Stage 1 MVP 范围确认 | EE Assembly + 3F3~3F6 |
| 20 min | 不做事项确认 | 排除 ESG、Package、物料等 |
| 10 min | 待确认事项记录 | TBD 清单 |

## 工作坊 2：数据与工艺确认

### 目标

确认字段、样例数据、路线和工段口径。

### 议程

| 时间 | 主题 | 输出 |
| --- | --- | --- |
| 20 min | MO 字段来源确认 | 字段映射表 |
| 30 min | 工艺路线样例确认 | route_operations 样例 |
| 20 min | ProcessType 字典确认 | 工段标准化字典 |
| 20 min | 样例订单选择 | 20~50 条样例订单 |
| 20 min | 异常样例确认 | 异常订单样例 |

## 工作坊 3：产能、日历与验收确认

### 目标

确认 UPPH、日历规则、异常字典和 Stage 1 准入条件。

### 议程

| 时间 | 主题 | 输出 |
| --- | --- | --- |
| 25 min | UPPH 口径确认 | 产能口径说明 |
| 20 min | 3F3~3F6 产线产能确认 | capacity 样例 |
| 20 min | 工作日历规则确认 | calendar 样例 |
| 20 min | 异常字典确认 | exception dictionary |
| 20 min | Stage 1 准入清单确认 | validation checklist |

## 会议纪要模板

```text
会议名称：Stage 0 工作坊 - xxx
会议日期：yyyy-mm-dd
参与人员：

1. 已确认事项
- 

2. 待确认事项
- 

3. 风险与问题
- 

4. 后续行动
- Owner：
- Due Date：
```

## Stage 0 最终评审会议

最终评审建议只判断一个问题：

```text
当前输出是否足以支撑 Stage 1 EE Assembly MVP 开发？
```

若答案为否，不建议进入 Stage 1。
