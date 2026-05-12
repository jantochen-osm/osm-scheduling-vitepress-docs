# 产线选择策略

## 基础策略

| 优先级 | 策略 | 说明 |
| --- | --- | --- |
| 1 | 人工锁定产线 | 若订单或工段被人工指定产线，则优先使用 |
| 2 | 专线规则 | FG Item Code、客户、品牌命中专线时优先 |
| 3 | 工段规则 | 根据 ProcessType 匹配可用产线 |
| 4 | 最早完成 | 候选线多条时，选择预计完成最早的线 |
| 5 | lineCode 顺序 | 仍相同则按 lineCode 固定顺序，保证结果稳定 |

## 示例

```text
IF OSM_Category = EE
AND ProcessType = Assembly
AND FG Item Code NOT IN 3F2 专线清单
THEN candidateLines = [3F3, 3F4, 3F5, 3F6]
SELECT line WITH earliestFinishDate
IF no candidate line THEN exceptionType = NO_AVAILABLE_LINE
```
