var TestModelData = {
  "data": {
    "data": {
      "prop_memo": "",
      "code": "Z200",
      "memo": "",
      "rid": 2,
      "ht_erp_sku": [
        {
          "code": "ABSJY140HZ200",
          "virtual_count": 0,
          "sco_count": 0,
          "bill_string": "#ABSJY140HZ200#0#0#ruyizang:Z200#0#{\"goods_id\":{\"name\":\"佛珠手串纯天然汉传白水晶14mm正圆精选级透明TJ14颗1203满1\"}}#0#0#0#0#0#1470157994430#种类:手串,主珠形状:正圆/自然圆,主珠珠径:14,品牌品级:B1,细分材质:白水晶#0#0.0#0#佛珠手串纯天然汉传白水晶14mm正圆精选级透明TJ14颗1203满1#1470157994430#ruyizang:ABSJY140HZ200#0#ruyizang#5",
          "ref_string": "{\"goods_id\":{\"name\":\"佛珠手串纯天然汉传白水晶14mm正圆精选级透明TJ14颗1203满1\"}}",
          "rid": 2,
          "so_count": 0,
          "po_count": 0,
          "prop_value": "种类:手串,主珠形状:正圆/自然圆,主珠珠径:14,品牌品级:B1,细分材质:白水晶",
          "price": 0.00,
          "ao_count": 0,
          "lm_ts": 1470157994000,
          "sro_count": 0,
          "id": "ruyizang:ABSJY140HZ200",
          "tenantry_id": "ruyizang",
          "goods_id": "ruyizang:Z200",
          "weight": 0.00,
          "account_crt_id": "",
          "volume": 0.00,
          "pco_count": 0,
          "pro_count": 0,
          "sku_count": 0,
          "crt_ts": 1470157994000,
          "name": "佛珠手串纯天然汉传白水晶14mm正圆精选级透明TJ14颗1203满1",
          "status": 5
        }
      ],
      "price": 0.00,
      "lm_ts": 1470157994000,
      "id": "ruyizang:Z200",
      "tenantry_id": "ruyizang",
      "brand": "",
      "weight": 60.00,
      "account_crt_id": "",
      "cate_id": "",
      "avatar": "",
      "volume": 0.00,
      "is_combo": 0,
      "is_gift": 0,
      "sales_name": "佛珠手串纯天然汉传白水晶14mm正圆精选级透明TJ14颗1203满1",
      "crt_ts": 1470157994000,
      "has_sku": 3,
      "bar_code": "",
      "name": "佛珠手串纯天然汉传白水晶14mm正圆精选级透明TJ14颗1203满1",
      "category": "",
      "status": 5
    },
    "model": {
      "code": "bill_single_goods_management",
      "events": [],
      "ext": "bill_goods_management_ext?is_combo=0",
      "formula": [],
      "layout": "list",
      "lm_ts": 1482849610057,
      "main": {
        "actions": [
          {
            "code": "stock",
            "name": "导入",
            "pos": "3",
            "type": "import"
          }
        ],
        "code": "ht_erp_goods",
        "col_count": 1,
        "fields": [
          {
            "cardpos": 0,
            "code": "id",
            "editable": true,
            "listpos": 0,
            "lm_ts": 1482849610057,
            "name": "业务主键",
            "required": true,
            "scope": "data",
            "status": 5,
            "tip": "提示信息",
            "type": "code"
          },
          {
            "cardpos": 1,
            "code": "account_crt_id",
            "def_value": "${account_id}",
            "editable": false,
            "fieldset": "bottom",
            "listpos": 0,
            "lm_ts": 1482849610057,
            "name": "创建人",
            "required": true,
            "scope": "both",
            "status": 5,
            "tip": "提示信息",
            "tpl": "{{account_crt_id_name}}",
            "type": "ref"
          },
          {
            "cardpos": 0,
            "code": "tenantry_id",
            "def_value": "${current_tenantry.id}",
            "editable": false,
            "listpos": 0,
            "lm_ts": 1482849610057,
            "name": "租户id",
            "required": true,
            "scope": "data",
            "status": 5,
            "tip": "提示信息",
            "tpl": "{{tenantry_id_name}}",
            "type": "code"
          },
          {
            "cardpos": 0,
            "code": "status",
            "def_value": "3",
            "editable": true,
            "listpos": 0,
            "lm_ts": 1482849610057,
            "name": "状态",
            "rangeset": "0:编辑@1:发布@3:完成",
            "required": true,
            "scope": "data",
            "status": 5,
            "tip": "提示信息",
            "type": "stat"
          },
          {
            "cardpos": 1,
            "code": "crt_ts",
            "def_value": "now()",
            "editable": true,
            "fieldset": "bottom",
            "listpos": 0,
            "lm_ts": 1482849610057,
            "name": "创建时间",
            "required": true,
            "scope": "both",
            "status": 5,
            "tip": "提示信息",
            "type": "timestamp"
          },
          {
            "cardpos": 0,
            "code": "lm_ts",
            "editable": true,
            "listpos": 0,
            "lm_ts": 1482849610057,
            "name": "最后修改时间",
            "required": true,
            "scope": "data",
            "status": 5,
            "tip": "提示信息",
            "type": "timestamp"
          },
          {
            "cardpos": 0,
            "code": "avatar",
            "editable": false,
            "listpos": 0,
            "lm_ts": 1482849610057,
            "name": "商品展示",
            "required": true,
            "scope": "data",
            "status": 5,
            "tip": "提示信息",
            "type": "stat"
          },
          {
            "cardpos": 1,
            "code": "code",
            "editable": true,
            "listpos": 2,
            "lm_ts": 1482849610057,
            "name": "货号",
            "required": true,
            "scope": "both",
            "status": 5,
            "tip": "提示信息",
            "type": "code"
          },
          {
            "cardpos": 2,
            "code": "name",
            "editable": true,
            "listpos": 1,
            "lm_ts": 1482849610057,
            "name": "商品名称",
            "required": true,
            "scope": "both",
            "status": 5,
            "tip": "提示信息",
            "type": "code"
          },
          {
            "cardpos": 3,
            "code": "price",
            "editable": true,
            "listpos": 6,
            "lm_ts": 1482849610057,
            "name": "销售价格（元）",
            "required": true,
            "scope": "both",
            "status": 5,
            "tip": "提示信息",
            "type": "money"
          },
          {
            "cardpos": 0,
            "code": "cate_id",
            "editable": true,
            "listpos": 0,
            "lm_ts": 1482849610057,
            "name": "分类",
            "required": false,
            "scope": "both",
            "status": 5,
            "tip": "提示信息",
            "type": "ref"
          },
          {
            "cardpos": 5,
            "code": "weight",
            "editable": true,
            "listpos": 7,
            "lm_ts": 1482849610057,
            "name": "重量（kg）",
            "required": true,
            "scope": "both",
            "status": 5,
            "tip": "提示信息",
            "type": "money"
          },
          {
            "cardpos": 0,
            "code": "bar_code",
            "editable": true,
            "listpos": 0,
            "lm_ts": 1482849610057,
            "name": "二维码",
            "required": true,
            "scope": "both",
            "status": 5,
            "tip": "提示信息",
            "type": "code"
          },
          {
            "cardpos": 7,
            "code": "sales_name",
            "editable": true,
            "listpos": 0,
            "lm_ts": 1482849610057,
            "name": "商品销售名称",
            "required": true,
            "scope": "both",
            "status": 5,
            "tip": "提示信息",
            "type": "code"
          },
          {
            "cardpos": 8,
            "code": "volume",
            "editable": true,
            "listpos": 8,
            "lm_ts": 1482849610057,
            "name": "体积",
            "required": true,
            "scope": "both",
            "status": 5,
            "tip": "提示信息",
            "type": "money"
          },
          {
            "cardpos": 9,
            "code": "brand",
            "editable": true,
            "listpos": 9,
            "lm_ts": 1482849610057,
            "name": "品牌",
            "rangeset": "{\"tpl_res\":\"{{name}}\",\"code\":\"ds_range_brand\",\"tpl_list\":\"{{name}}\"}",
            "required": false,
            "scope": "both",
            "status": 5,
            "tip": "提示信息",
            "tpl": "{{brand_name}}",
            "type": "ref"
          },
          {
            "cardpos": 10,
            "code": "cate_id",
            "editable": true,
            "listpos": 10,
            "lm_ts": 1482849610057,
            "name": "品类",
            "rangeset": "{\"tpl_res\":\"{{name}}\",\"code\":\"ds_range_category\",\"tpl_list\":\"{{name}}\"}",
            "required": false,
            "scope": "both",
            "status": 5,
            "tip": "提示信息",
            "tpl": "{{cate_id_name}}",
            "type": "ref"
          },
          {
            "cardpos": 0,
            "code": "is_combo",
            "def_value": "0",
            "editable": true,
            "listpos": 0,
            "lm_ts": 1482849610057,
            "name": "组合商品",
            "rangeset": "0:否@3:是",
            "required": true,
            "scope": "both",
            "status": 5,
            "tip": "提示信息",
            "type": "stat"
          },
          {
            "cardpos": 20,
            "code": "is_gift",
            "def_value": "0",
            "editable": true,
            "listpos": 20,
            "lm_ts": 1482849610057,
            "name": "赠品",
            "rangeset": "0:否@1:是",
            "required": true,
            "scope": "both",
            "status": 5,
            "tip": "提示信息",
            "type": "stat"
          },
          {
            "cardpos": 21,
            "code": "prop_memo",
            "editable": true,
            "listpos": 0,
            "lm_ts": 1482849610057,
            "name": "商品属性",
            "required": false,
            "scope": "both",
            "status": 5,
            "tip": "提示信息",
            "type": "memo"
          },
          {
            "cardpos": 21,
            "code": "memo",
            "editable": true,
            "listpos": 0,
            "lm_ts": 1482849610057,
            "name": "备注",
            "required": false,
            "scope": "both",
            "status": 5,
            "tip": "提示信息",
            "type": "memo"
          }
        ],
        "lm_ts": 1482849610057,
        "name": "商品维护",
        "ref_type": "bridge",
        "status": 5
      },
      "slaves": [
        {
          "code": "ht_erp_sku",
          "col_count": 1,
          "fields": [
            {
              "cardpos": 0,
              "code": "id",
              "editable": true,
              "listpos": 0,
              "lm_ts": 1482849610057,
              "name": "业务主键",
              "required": true,
              "scope": "data",
              "status": 5,
              "tip": "提示信息",
              "type": "code"
            },
            {
              "cardpos": 0,
              "code": "account_crt_id",
              "def_value": "${account_id}",
              "editable": false,
              "listpos": 0,
              "lm_ts": 1482849610057,
              "name": "创建人",
              "required": true,
              "scope": "both",
              "status": 5,
              "tip": "提示信息",
              "tpl": "{{account_crt_id_name}}",
              "type": "ref"
            },
            {
              "cardpos": 0,
              "code": "tenantry_id",
              "def_value": "${current_tenantry.id}",
              "editable": false,
              "listpos": 0,
              "lm_ts": 1482849610057,
              "name": "租户id",
              "required": true,
              "scope": "data",
              "status": 5,
              "tip": "提示信息",
              "tpl": "{{tenantry_id_name}}",
              "type": "code"
            },
            {
              "cardpos": 0,
              "code": "status",
              "def_value": "3",
              "editable": true,
              "listpos": 0,
              "lm_ts": 1482849610057,
              "name": "状态",
              "rangeset": "0:编辑@1:发布@3:完成",
              "required": true,
              "scope": "data",
              "status": 5,
              "tip": "提示信息",
              "type": "stat"
            },
            {
              "cardpos": 0,
              "code": "crt_ts",
              "def_value": "now()",
              "editable": true,
              "listpos": 0,
              "lm_ts": 1482849610057,
              "name": "创建时间",
              "required": true,
              "scope": "data",
              "status": 5,
              "tip": "提示信息",
              "type": "timestamp"
            },
            {
              "cardpos": 0,
              "code": "lm_ts",
              "editable": true,
              "listpos": 0,
              "lm_ts": 1482849610057,
              "name": "最后修改时间",
              "required": true,
              "scope": "data",
              "status": 5,
              "tip": "提示信息",
              "type": "timestamp"
            },
            {
              "cardpos": 1,
              "code": "code",
              "editable": true,
              "listpos": 1,
              "lm_ts": 1482849610057,
              "name": "编码",
              "required": true,
              "scope": "both",
              "status": 5,
              "tip": "提示信息",
              "type": "code"
            },
            {
              "cardpos": 2,
              "code": "name",
              "editable": true,
              "listpos": 2,
              "lm_ts": 1482849610057,
              "name": "sku名称",
              "required": true,
              "scope": "both",
              "status": 5,
              "tip": "提示信息",
              "type": "code"
            },
            {
              "cardpos": 3,
              "code": "price",
              "editable": true,
              "listpos": 3,
              "lm_ts": 1482849610057,
              "name": "单价",
              "required": true,
              "scope": "both",
              "status": 5,
              "tip": "提示信息",
              "type": "money"
            },
            {
              "cardpos": 4,
              "code": "weight",
              "def_value": "0",
              "editable": true,
              "listpos": 4,
              "lm_ts": 1482849610057,
              "name": "重量（kg）",
              "required": true,
              "scope": "both",
              "status": 5,
              "tip": "提示信息",
              "type": "money"
            },
            {
              "cardpos": 5,
              "code": "volume",
              "def_value": "0",
              "editable": true,
              "listpos": 5,
              "lm_ts": 1482849610057,
              "name": "体积（立方厘米）",
              "required": true,
              "scope": "both",
              "status": 5,
              "tip": "提示信息",
              "type": "money"
            },
            {
              "cardpos": 0,
              "code": "combo_sku_count",
              "def_value": "0",
              "editable": true,
              "listpos": 0,
              "lm_ts": 1482849610057,
              "name": "组成数量",
              "required": true,
              "scope": "both",
              "status": 0,
              "tip": "提示信息",
              "type": "integer"
            },
            {
              "cardpos": 0,
              "code": "sku_count",
              "def_value": "0",
              "editable": true,
              "listpos": 7,
              "lm_ts": 1482849610057,
              "name": "库存",
              "required": true,
              "scope": "both",
              "status": 5,
              "tip": "提示信息",
              "type": "integer"
            },
            {
              "cardpos": 8,
              "code": "virtual_count",
              "def_value": "0",
              "editable": true,
              "listpos": 8,
              "lm_ts": 1482849610057,
              "name": "虚拟库存",
              "required": true,
              "scope": "both",
              "status": 5,
              "tip": "提示信息",
              "type": "integer"
            },
            {
              "cardpos": 2,
              "code": "prop_value",
              "editable": true,
              "listpos": 2,
              "lm_ts": 1482849610057,
              "name": "sku属性",
              "required": true,
              "scope": "both",
              "status": 5,
              "tip": "提示信息",
              "type": "memo"
            }
          ],
          "lm_ts": 1482849610057,
          "name": "商品sku表",
          "ref_type": "direct",
          "rm": {
            "id_key_main": "id",
            "id_key_slave": "goods_id",
            "lm_ts": 1482849610057,
            "status": 5,
            "type": "inner"
          },
          "status": 5
        }
      ],
      "status": 5
    }
  },
  "status": 1
}

var dataTest  = TestModelData.data.data
// Model
var modelTest = TestModelData.data.model
