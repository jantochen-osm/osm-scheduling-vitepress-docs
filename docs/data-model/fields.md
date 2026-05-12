# 字段建议

## MO 订单字段

```text
MO
FG Item Code
Qty
DlvDate
Status
Pool
OSM_Category
CustomerCode
CustomerName
Brand
RouteId
CompletedQty
RemainingQty
IsFrozen
IsCancelled
```

## 工艺路线字段

```text
FG Item Code
RouteId
OperationSeq
OperationCode
OperationName
ProcessType
StandardUPPH
LaborQty
IsQuantifiable
```

## 产线字段

```text
lineCode
lineName
lineGroup
floor
processTypeSupported
isSchedulable
isTrialLine
status
```

## 排产结果字段

```text
runId
MO
FG Item Code
operationCode
processType
lineCode
planDate
planQty
startDate
finishDate
DlvDate
isLate
lateDays
ruleTraceId
```
