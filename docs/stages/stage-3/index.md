# 阶段 3：ESG 专线场景扩展

## 目标

在已有多工段框架上加入 ESG 产线规则，覆盖 Amazon、Chicha、Shure、Jano-Life。

## 纳入范围

- OSM_Category = ESG。
- 4F1 Amazon。
- 4F2 Chicha。
- 4F4 Shure。
- 4F6 Jano-Life。
- 4F3/4F5 试产线排除正式单。
- ESG 全工段规则。

## 暂不纳入范围

- 4F7/4F8 未确认场景。
- ESG Cutting 精确 UPPH 优化。
- 试产订单排程。

## 输入数据

- ESG 订单。
- 客户/品牌/FG Item Code 判断字段。
- Chicha 固定料号清单。
- Amazon/Shure/Jano-Life 专线规则。
- ESG 工艺路线。

## 处理流程

```text
1. 筛选 ESG 订单
2. 校验客户、品牌、FG Item Code 字段
3. 判断是否命中固定料号或专线客户
4. 匹配 4F1/4F2/4F4/4F6
5. 排除 4F3/4F5 正式排产
6. 对 UPPH 缺失工段生成异常或人工产能提示
7. 输出 ESG 排产结果和异常
```

## 输出结果

- ESG 专线排产结果。
- 客户/料号规则命中日志。
- ESG 缺 UPPH 工段清单。
- ESG 规则冲突清单。

## 验收标准

- Amazon 只进入 4F1。
- Chicha 固定料号进入 4F2。
- Shure 进入 4F4。
- Jano-Life 进入 4F6。
- 4F3/4F5 不承接正式订单。

## 与下一阶段的衔接

阶段 3 使系统覆盖 OSM 主体 EE + ESG 场景。阶段 4 将在此基础上增强日历、异常、人工干预和可解释性。

## 主要风险与控制

- 客户名称不稳定：优先使用 Customer Code、Brand Code、FG Item Code。
- ESG 某些工段 UPPH 缺失：保留工段节点并进入异常/人工确认。
