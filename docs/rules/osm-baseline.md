# OSM 业务规则基线

## 订单筛选入口

```text
Status != 已结束
AND Pool IN (SC_YBSC_F3, SC_YBSC_HT, SCD_HT_CC, SCD_HT_F3)
AND DlvDate IS NOT NULL
AND Qty > 0
ORDER BY DlvDate ASC
```

## Line Group 分类

| 分类字段 | 分类结果 | 说明 |
| --- | --- | --- |
| OSM_Category = EE | EE Line | 进入 EE 产线规则匹配 |
| OSM_Category = ESG | ESG Line | 进入 ESG 产线规则匹配 |
| 为空或未知值 | 异常 | 进入 Line 分类异常清单 |

## EE Line 规则

| 产线 | 定位 | 是否纳入正式排产 | 说明 |
| --- | --- | --- | --- |
| 1F1 | Package | 是 | EE Package 工段 |
| 1F2 | Package | 是 | EE Package 工段 |
| 1F3 | Package / 试产 | 否/仅试产 | 初期不纳入正式排产 |
| 3F1 | 半成品 / 特定 Assembly | 是 | 半成品工段；FA014A02 产品 Assembly 可在此排产 |
| 3F2 | 特定产品全工段 | 是 | 通过固定 FG Item Code 识别特定产品 |
| 3F3~3F6 | Assembly | 是 | 常规 Assembly 产线 |

## ESG Line 规则

| 产线 | 定位 | 是否纳入正式排产 | 说明 |
| --- | --- | --- | --- |
| 4F1 | Amazon | 是 | Amazon 专线 |
| 4F2 | Chicha | 是 | 通过固定料号判断 |
| 4F3 | 试产 | 否/仅试产 | 初期不纳入正式排产 |
| 4F4 | Shure | 是 | Shure 专线 |
| 4F5 | 试产 | 否/仅试产 | 初期不纳入正式排产 |
| 4F6 | Jano-Life | 是 | Jano-Life 专线 |
| 4F7~4F8 | 待确认 | 待确认 | 需业务确认定位后再纳入规则 |

## 日历与工时规则

| 日期类型 | 默认工时 | 说明 |
| --- | --- | --- |
| 正常工作日 | 10h | 默认标准工作日 |
| 周六 | 8h | 默认加班/短工时 |
| 周日 | 0h | 初期默认不排产，后续可由例外开放 |
| 大型节假日前一天 | 8h | 默认短工时 |
| 每月最后一个工作日 | 8h | 默认短工时 |
| 法定节假日 | 0h | 默认不排产 |
| 产线级特殊日历 | 按维护值 | 优先级高于通用日历 |
