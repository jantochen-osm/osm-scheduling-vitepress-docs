# 09 交付物模板

Stage 0 应输出一组可被 Stage 1 直接使用的交付物。

## 1. 文档类交付物

| 文件名建议 | 内容 | 用途 |
| --- | --- | --- |
| stage0_business_boundary.md | 排产范围、粒度、假设、不做事项 | 锁定业务边界 |
| stage0_field_mapping.md | 字段映射与字段说明 | 支撑开发取数 |
| stage0_rule_baseline.md | OSM 订单筛选、产线映射、日历规则 | 支撑规则中心 |
| stage0_exception_dictionary.md | 异常类型、触发条件、等级 | 支撑异常诊断 |
| stage0_validation_checklist.md | 准入 Stage 1 的检查表 | 支撑验收 |

## 2. 数据类交付物

| 文件名建议 | 内容 | 用途 |
| --- | --- | --- |
| stage0_sample_mo_orders.xlsx | 样例 MO 订单 | Stage 1 测试输入 |
| stage0_sample_route_operations.xlsx | 样例工艺路线 | Stage 1 查询路线 |
| stage0_sample_lines.xlsx | 产线主数据 | Stage 1 匹配产线 |
| stage0_sample_capacity.xlsx | UPPH 样例 | Stage 1 计算产能 |
| stage0_sample_calendar.xlsx | 工作日历样例 | Stage 1 计算工时 |

## 3. 规则类交付物

| 文件名建议 | 内容 | 用途 |
| --- | --- | --- |
| rule_priority_inputs_seed.xlsx | 订单筛选与排序规则 | 初始化规则表 |
| rule_line_inputs_seed.xlsx | 产线映射规则 | 初始化规则表 |
| capacity_param_inputs_seed.xlsx | 产能参数 | 初始化规则表 |
| calendar_exception_inputs_seed.xlsx | 日历例外 | 初始化规则表 |

## 4. Stage 1 输入包目录建议

```text
stage0-output/
├── docs/
│   ├── stage0_business_boundary.md
│   ├── stage0_field_mapping.md
│   ├── stage0_rule_baseline.md
│   ├── stage0_exception_dictionary.md
│   └── stage0_validation_checklist.md
├── samples/
│   ├── stage0_sample_mo_orders.xlsx
│   ├── stage0_sample_route_operations.xlsx
│   ├── stage0_sample_lines.xlsx
│   ├── stage0_sample_capacity.xlsx
│   └── stage0_sample_calendar.xlsx
└── seeds/
    ├── rule_priority_inputs_seed.xlsx
    ├── rule_line_inputs_seed.xlsx
    ├── capacity_param_inputs_seed.xlsx
    └── calendar_exception_inputs_seed.xlsx
```

## 5. 交付物验收标准

```text
1. 文档能让业务人员确认边界。
2. 样例数据能让开发人员跑通 Stage 1。
3. 规则 seed 能让规则中心初始化。
4. 异常字典能让排产失败原因可解释。
5. 验证清单能判断是否可进入 Stage 1。
```
