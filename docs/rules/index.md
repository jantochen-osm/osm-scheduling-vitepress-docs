# 规则中心总览

OSM 排产系统建议使用规则中心承载业务规则。

核心规则类型包括：

- 订单筛选规则
- 订单优先级规则
- Line Group 分类规则
- 产线映射规则
- 专线规则
- 试产线规则
- 产能参数规则
- 日历例外规则

## 推荐规则表

```text
rule_priority_inputs
rule_line_inputs
capacity_param_inputs
calendar_exception_inputs
```

## 规则原则

规则必须具备：

- 唯一编码
- 生效日期
- 失效日期
- 优先级
- 命中条件
- 输出结果
- 是否启用
- 规则说明
