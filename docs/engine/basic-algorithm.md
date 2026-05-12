# 基础算法

## 初始算法类型

第一版采用按订单顺序逐个排入产线的贪心算法。

```text
FOR each order IN sortedOrders:
  validate order
  route = getRoute(order.FGItemCode)
  operations = sort(route.operations by OperationSeq)

  FOR each operation IN operations:
    candidateLines = matchLines(order, operation)
    selectedLine = selectEarliestFinishLine(candidateLines)
    allocateCapacity(order, operation, selectedLine)
```

## 初始排序规则

```text
ORDER BY DlvDate ASC
```

后续可扩展为：

```text
ORDER BY
  isUrgent DESC,
  DlvDate ASC,
  customerPriority DESC,
  orderPriority DESC,
  createdAt ASC,
  MO ASC
```

## 初始工段流转假设

```text
前工段整单完成后，后工段才允许开始。
```

## 初始拆分假设

```text
同一 MO 的同一工段允许跨日，不允许跨线。
```
