(function() {
    "use strict";
    var form = (function() {
        var form = function(model, element, parent, setting) {
            return new form.prototype.init(model, element, parent, setting);
        }
        form.fn = form.prototype;
        form.extend = form.prototype.extend = $.extend;
        form.fn.init = function(model, element, parent, setting) {
            setting = setting || {}
            model = model || {}
            this.data = setting.data
            this.model = model
            this.element = element
            // this.type = " form"  //保留字段
            // this.parent = parent //父元素
            // this.backup = JSON.parse(JSON.stringify(this)) //备份

            // 转换
            this.model = this.ConverterModel(this.model)
            this.data = this.ConverterData(this.data)
            this.load()

            return this;
        }
        form.fn.extend({
            // Model Data 转换器
            ConverterModel: function(model) {
                var zxModel = {}
                zxModel.main = {}
                zxModel.main.fields = []
                for (var field of model.main.fields) {
                    if (field.cardpos) {
                        var tempObj = {}
                        // 字段中需要的参数
                        tempObj["name"] = field.name //名称
                        tempObj["required"] = field.required //是否必填
                        tempObj["code"] = field.code //字段名 (编码)
                        tempObj["type"] = field.type //类型
                        tempObj["sort"] = field.cardpos //排序
                        tempObj["edit"] = field.editable //可否编辑
                        if (field.rangeset) {
                        tempObj["radio"] = field.rangeset //单选框
                        }
                        zxModel.main.fields.push(tempObj)
                    }
                }
                return zxModel
            },
            ConverterData: function(data) {
                var zxData = {}
                // 提取需要的参数
                for (var field  of this.model.main.fields) {
                    zxData[field.code] = data[field.code]
                }
                return zxData
            },
            // build是用来建立html结构的，没有建立额外结构就放空
            build: function() {

                },
            // load是用来做dom处理的，插件调用和事件绑定都会在这里
            load: function() {
                for (var field of this.model.main.fields) {
                    // 执行 fieldType 对应的函数
                    form.fieldType[field.type](field, this.data)
                }
            },
        })
        form.extend({
            fieldType: {
                // 字段编码
                code: function(field, data) {
                    var value = data[field.code]
                    var html = `
                    <label for="${field.code}">${field.name}</label>
                    <input placeholder="${value}" value="${value}">`
                    $('fieldset').append(html)
                },
                // 下拉框select
                ref: function(field, data) {
                    // log(field.name, data[field.code])
                    },
                // 单选 input radio
                stat: function(field, data) {
                    // 组装radio
                    var radio = []
                    if (field.radio) {
                        for (let i of field.radio.split("@")) {
                            radio.push( i.split(":")[1] )
                        }
                    }
                    var checked = "" //初始选定
                    var html = `<label for="${field.code}">${field.name}</label>`
                    for (let i = 0; i < radio.length; i++) {
                        // 单个 id 和 for 要相同
                        if (i === data[field.code]) {
                            checked = "checked"
                        } else {
                            checked = ""
                        }
                        var temp = `
                        <label for="${field.code}${i}" class="pure-radio">
                            <input id="${field.code}${i}" type="radio" name="${field.name}" value="${i}" ${checked}>
                            ${radio[i]}
                        </label>`
                        html += temp
                    }
                    $('fieldset').append(html)
                    },
                // 时间对象
                timestamp: function(field, data) {

                    },
                // 钱
                money: function(field, data) {

                    },
                // 文本框 textarea
                memo: function(field, data) {

                    }
            }
        })
        form.prototype.init.prototype = form.prototype;
        return form
    })()
    window.form = form
})()
