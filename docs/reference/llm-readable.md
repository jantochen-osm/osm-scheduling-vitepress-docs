# LLM 可读上下文规范

为了让 LLM 模型能够稳定理解并继续扩展本系统，建议后续所有设计、字段、规则和测试用例都遵循以下格式。

## 规则表达

使用 IF / THEN 或 条件 → 结果 的形式表达。

```text
IF OSM_Category = EE
AND ProcessType = Assembly
AND FG Item Code NOT IN 3F2 专线清单
THEN candidateLines = [3F3, 3F4, 3F5, 3F6]
```

## 产线映射表达

明确：

- lineGroup
- processType
- candidateLines
- priority
- isSchedulable

## 异常表达

明确：

- exceptionType
- triggerCondition
- severity
- suggestedAction

## 阶段表达

每个阶段明确：

- 目标
- 输入
- 处理
- 输出
- 验收
- 下一阶段衔接

## 假设表达

显式写出假设，例如：

```text
同一 MO 同一工段不允许跨线。
```

## 未确认事项

不要隐含处理，应列为 TBD 或业务待确认。
