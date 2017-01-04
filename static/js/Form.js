// 待解决问题：fieldEvent money 小数点末尾保留两位 、select2 插件智造
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
            this.title  = setting.title  || ''
            this.column = setting.column || 3
            // this.type = " form"  //保留字段
            // this.parent = parent //父元素
            // this.backup = JSON.parse(JSON.stringify(this)) //备份

            // 转换
            this.model = this.ConverterModel(this.model)
            this.data = this.ConverterData(this.data)
            this.build()
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
                        tempObj["radio"] = field.rangeset //单选框
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
                // 表单组件示例
                if (this.title !== '') {
                    var title = '<legend>' + this.title + '</legend>'
                }
                $(this.element).append(`
                    <div class="pure-form pure-form-stacked">
                        <fieldset>
                            ${title}
                            <div class="pure-g"></div>
                        </fieldset>
                    </div>`)
                // 表单内容
                for (var field of this.model.main.fields) {
                    // 执行 fieldType 对应的函数
                    if (form.fieldType[field.type]) {
                        var html = form.fieldType[field.type](field, this.data)
                    }
                    $('.pure-g').append(`<div class="pure-u-1 pure-u-md-1-${this.column}">${html}</div>`)
                }
            },
            // load是用来做dom处理的，插件调用和事件绑定都会在这里
            load: function() {
                for (var field of this.model.main.fields) {
                    // 执行 fieldEvent 对应的函数
                    if (form.fieldEvent[field.type]) {
                        form.fieldEvent[field.type](field)
                    }
                }
            },
            getField: function(name) {
                for (let field of this.model.main.fields) {
                    if (name === field.name || name === field.code) {
                        var dom = $(this.element).find('.' + field.code)[0]
                        if (field.type === 'ref' || field.type === 'stat' || field.type === 'timestamp') {
                            return dom.dataset.code
                        } else {
                            return dom.value
                        }
                    }
                }
            },
            setField: function(name, value) {
                for (let field of this.model.main.fields) {
                    if (name === field.name || name === field.code) {
                        var dom = $(this.element).find('.' + field.code)[0]
                        if (field.type === 'ref' || field.type === 'stat' || field.type === 'timestamp') {
                            dom.dataset.code = value
                            form.fieldEvent[field.type](field)
                        } else {
                            dom.value = value
                        }
                    }
                }
            }
        })
        form.extend({
            fieldType: {
                // 字段编码
                code: function(field, data) {
                    var value = data[field.code]
                    var html = `
                    <label for="${field.code}">${field.name}</label>
                    <input class="${field.code}" placeholder="${value}" value="${value}">`
                    return html
                },
                // 下拉框select
                ref: function(field, data) {
                    var select = data[field.code].split(':')
                    // HTML标题
                    var html = `<label for="${field.code}">${field.name}</label><select class="${field.code}">`
                    for (var i of select) {
                        // HTML选项
                        var temp = `<option>${i}</option>`
                        html += temp
                    }
                    html += '</select>'
                    return html
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
                    // HTML标题
                    var html = `<label for="${field.code}" class="${field.code}" data-code="${data[field.code]}">${field.name}</label>`
                    for (let i = 0; i < radio.length; i++) {
                        // HTML每个单选项 单个 id 和 for 要相同
                        var temp = `
                        <label for="${field.code}_${i}" class="pure-radio">
                            <input id="${field.code}_${i}" type="radio" name="${field.name}" value="${i}">
                            ${radio[i]}
                        </label>`
                        html += temp
                    }
                    return html
                    },
                // 时间对象
                timestamp: function(field, data) {
                    var value = data[field.code]
                    var html = `
                    <label for="${field.code}">${field.name}</label>
                    <input class="${field.code}" data-code="${value}">`
                    return html
                },
                // money 限制数字 和 小数点后两位
                money: function(field, data) {
                    var value = data[field.code]
                    var html = `
                    <label for="${field.code}">${field.name}</label>
                    <input class="${field.code}" type="number" placeholder="${value}" value="${value}">`
                    return html
                },
                // 文本框 textarea
                memo: function(field, data) {
                    var html = `<label for="${field.code}">${field.name}</label><textarea class="${field.code}" rows="4">`
                    html += data[field.code]
                    html += '</textarea>'
                    return html
                    }
            },
            fieldEvent: {
                timestamp: function(field) {
                    var element = $('.' + field.code)
                    var oldTime = new Date(element.data('code'))
                    element.daterangepicker({
                        "timePicker": true,
                        "singleDatePicker": true,
                        "startDate": oldTime,
                    }, function(start, end, label) {
                        element[0].dataset.code = start._d.getTime()
                    })
                },
                money: function(field) {
                    var element = $('.' + field.code)
                    // log(element)
                },
                stat: function(field) {
                    var radio = []
                    if (field.radio) {
                        for (let i of field.radio.split("@")) {
                            radio.push( i.split(":")[1] )
                        }
                    }
                    for (var i = 0; i < radio.length; i++) {
                        // 闭包!
                        let dom = $('#' + field.code + '_' + i).parent()
                        if (i == $('.' + field.code)[0].dataset.code) {
                            dom.children()[0].checked = true
                        }
                        dom.off()
                        dom.on("click", function() {
                            var value = dom.attr('for').slice(-1)
                            $('.' + field.code)[0].dataset.code = value
                        })
                    }
                },
                ref: function() {

                }
            }
        })
        form.prototype.init.prototype = form.prototype;
        return form
    })()
    window.form = form
})()
