# 05 工艺路线与工段基线

工艺路线是排产系统的核心输入之一。

Stage 0 必须确认：**ItemId（成品料号）如何找到工艺路线，以及工艺路线如何拆解为标准工段。**

## 1. 工艺路线基本链路

```text
ItemId（成品料号）
  ↓
RouteId
  ↓
OperationSeq + OperationCode + OperationName
  ↓
ProcessType 标准化
  ↓
产线映射规则
```

## 2. 为什么需要 ProcessType

AX 或工艺路线中的 OperationName 可能存在名称不一致，例如：

```text
Assembly
ASM
Assembling
装配
组装
```

系统不能直接用原始名称匹配产线，应标准化为：

```text
ProcessType = Assembly
```

## 3. ProcessType 映射模板

| 原始 OperationCode | 原始 OperationName | 标准 ProcessType | 是否参与排产 | 备注 |
| --- | --- | --- | --- | --- |
| ASM | Assembly | Assembly | 是 | Stage 1 使用 |
| PKG | Package | Package | Stage 2 | 后续引入 |
| CUT | Cutting | Cutting | 待确认 | UPPH 难量化时进入异常或人工确认 |
| INS | Inspection | Inspection | 待确认 | 视是否占产线/人力决定 |

## 4. Stage 1 对工艺路线的最低要求

Stage 1 只需要确认：

```text
ItemId 能查到至少一个 ProcessType = Assembly 的工段。
```

若查不到，进入异常：

```text
exceptionType = MISSING_ASSEMBLY_OPERATION
```

## 5. 多工段顺序预留

虽然 Stage 1 只排 Assembly，但 Stage 0 应保留 OperationSeq。

后续 Stage 2 需要支持：

```text
Cutting → Assembly → Package
```

或：

```text
SemiFinished → Assembly → Package
```

## 6. 工艺路线异常

| 异常类型 | 触发条件 | 处理方式 |
| --- | --- | --- |
| MISSING_ROUTE | ItemId 找不到路线 | 阻断订单排产 |
| MISSING_OPERATION_SEQ | OperationSeq 为空 | 阻断多工段排产 |
| UNKNOWN_PROCESS_TYPE | OperationName 无法标准化 | 进入工艺异常 |
| MISSING_ASSEMBLY_OPERATION | Stage 1 场景找不到 Assembly | 阻断 Stage 1 排产 |
| DUPLICATE_OPERATION_SEQ | 同一路线内顺序重复 | 进入工艺异常 |

## 7. 输出物

建议输出：

```text
stage0_route_operation_mapping.xlsx
stage0_process_type_dictionary.xlsx
```
