# 02 数据源与字段映射

字段映射用于回答：**排产系统需要的字段，从哪里来，含义是什么，是否可用。**

## 1. 字段映射原则

每个字段必须说明：

- 标准字段名
- 来源系统
- 来源表或视图
- 来源字段
- 字段类型
- 是否必填
- 业务含义
- 示例值
- 数据质量风险

## 2. MO 订单字段映射模板

| 标准字段 | 来源系统 | 来源字段 | 类型 | 必填 | 示例 | 说明 |
| --- | --- | --- | --- | --- | --- | --- |
| MO | AX 2012 / 中间库 | 待确认 | string | 是 | MO12345 | 制造订单号 |
| FGItemCode | AX 2012 / 中间库 | 待确认 | string | 是 | FA014A02 | 成品料号 |
| Qty | AX 2012 / 中间库 | 待确认 | number | 是 | 2500 | 订单数量或剩余待产数量 |
| DlvDate | AX 2012 / 中间库 | 待确认 | date | 是 | 2026-05-20 | 交货日期 |
| Status | AX 2012 / 中间库 | 待确认 | string | 是 | Released | 订单状态 |
| Pool | AX 2012 / 中间库 | 待确认 | string | 是 | SC_YBSC_F3 | 订单池 |
| OSM_Category | AX 2012 / 中间库 | 待确认 | string | 是 | EE | OSM 分类 |
| CustomerCode | AX 2012 / 中间库 | 待确认 | string | 否 | C001 | 客户编码 |
| Brand | AX 2012 / 中间库 | 待确认 | string | 否 | Amazon | 品牌或客户属性 |

## 3. 工艺路线字段映射模板

| 标准字段 | 来源系统 | 来源字段 | 类型 | 必填 | 示例 | 说明 |
| --- | --- | --- | --- | --- | --- | --- |
| FGItemCode | AX 2012 / 中间库 | 待确认 | string | 是 | FA014A02 | 成品料号 |
| RouteId | AX 2012 / 中间库 | 待确认 | string | 是 | R001 | 路线编号 |
| OperationSeq | AX 2012 / 中间库 | 待确认 | number | 是 | 10 | 工段顺序 |
| OperationCode | AX 2012 / 中间库 | 待确认 | string | 是 | ASM | 工序编码 |
| OperationName | AX 2012 / 中间库 | 待确认 | string | 是 | Assembly | 工序名称 |
| ProcessType | 系统标准化 | 映射生成 | string | 是 | Assembly | 标准工段类型 |

## 4. 产线字段映射模板

| 标准字段 | 来源 | 类型 | 必填 | 示例 | 说明 |
| --- | --- | --- | --- | --- | --- |
| lineCode | 人工维护 / 主数据 | string | 是 | 3F3 | 产线编码 |
| lineGroup | 人工维护 / 主数据 | string | 是 | EE | EE / ESG |
| floor | 人工维护 / 主数据 | string | 否 | 3F | 楼层 |
| isSchedulable | 人工维护 / 主数据 | boolean | 是 | true | 是否进入正式排产 |
| isTrialLine | 人工维护 / 主数据 | boolean | 是 | false | 是否试产线 |

## 5. 字段质量检查

Stage 0 必须检查：

```text
1. DlvDate 是否为空。
2. Qty 是否小于等于 0。
3. Pool 是否在 OSM 白名单中。
4. OSM_Category 是否只包含 EE / ESG。
5. FG Item Code 是否为空。
6. FG Item Code 是否能查到路线。
7. OperationSeq 是否为空或重复。
8. ProcessType 是否能标准化。
```

## 6. 输出物

本页面对应输出物：

```text
字段映射表.xlsx 或字段映射表.md
```

建议文件名：

```text
stage0_field_mapping_v1.xlsx
```
