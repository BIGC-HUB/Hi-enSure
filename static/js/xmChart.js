(function() {
    "use strict";
    var chart = (function() {
        var chart = function(model, element, parent, setting) {
            return new chart.prototype.init(model, element, parent, setting);
        }
        chart.fn = chart.prototype;
        chart.extend = chart.prototype.extend = $.extend;
        chart.fn.init = function(model, element, parent, setting) {
            setting = setting || {};
            model = model || {};
            this.model = model;
            this.type = "chart" //type是保留字段
            this.chartType = model.show_type;
            this.code = model.code;
            this.encode = model.code;
            this.data = setting.data;
            this.element = element;
            this.parent = parent;
            this.panel = JSON.parse(JSON.stringify(this));
            // this.build();
            this.load();

            return this;
        }
        chart.fn.extend({
            //build是用来建立html结构的，没有建立额外结构就放空
            build: function() {

            },
            //load是用来做dom处理的，插件调用和事件绑定都会在这里
            //需要尽量避开保留的属性名
            load: function() {
                this.loadData = this.dataLoader(this.data, this.model);
                if (chart.configBuilder[this.chartType]) {
                    chart.configBuilder[this.chartType](this.loadData, this.element)
                    //这些函数里这一步也写出来 echarts.init(Dom).setOption(option)
                } else {
                    //给予提示
                    console.log("提示：嘟嘟嘟！")
                }
            },
            //改变图表数据
            setData(data){
                this.data = data
                this.load()
            },
            //改变图表模型
            setModel(model){
                this.model = model
                this.chartType = model.show_type
                this.load()
            },
            //恢复成最初的输入和模型
            resetChart(){
                this.chartType = this.panel.model.show_type
                this.loadData = this.dataLoader(this.panel.data, this.panel.model);
                chart.configBuilder[this.chartType](this.loadData, this.element)
            },
            //改成使用 dataLoader
            dataLoader: function(data, model) {
                //能用this获取的就别用参数
                var result = []
                var j = {}
                j.title = model.code //标题
                j.name  = model.name //内容
                j.type  = model.show_type //类型
                if (chart.dataLoader[this.chartType]) {
                    j = chart.dataLoader[this.chartType](data, model, j)
                    result.push(j)
                    return result
                } else {
                    console.log("错误")
                }
            },
        });
        chart.extend({
            configBuilder: {
                // 柱形图 bar
                bar: function(Data, Dom) {
                    var xAxis = Data[0].xAxis
                    var title = Data[0].title
                    var className = []
                    for (let i of Data) {
                        className.push(i.name)
                    }
                    var option = {
                        color: ['#333'],
                        title: {
                            text: title
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        // legend: {
                        //     data: className
                        // },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            data: xAxis,
                            axisTick: {
                                alignWithLabel: true
                            }
                        }],
                        yAxis: [{
                            type: 'value'
                        }],
                        series: Data
                    }
                    echarts.init(Dom).setOption(option)
                },
                // 折线图 line
                line: function(Data, Dom) {
                    var title = Data[0].title
                    var xAxis = Data[0].xAxis
                    var className = []
                    for (let i of Data) {
                        className.push(i.name)
                    }
                    var option = {
                        title: {
                            text: title
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: className
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        toolbox: {
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: xAxis
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: Data
                    }
                    echarts.init(Dom).setOption(option)
                },
                // 雷达图 radar
                radar: function(Data, Dom) {
                    var title = Data[0].title
                    var className = []
                    for (let i of Data) {
                        className.push(i.name)
                    }
                    var indicator = Data[0].indicator
                    var option = {
                        title: {
                            text: title
                        },
                        tooltip: {},
                        legend: {
                            data: className
                        },
                        radar: {
                            // shape: 'circle', //圆
                            indicator: indicator
                        },
                        series: [{
                            // name: '预算 vs 开销（Budget vs spending）',
                            type: 'radar',
                            // areaStyle: {normal: {}}, //填充色
                            data: Data
                        }]
                    };
                    echarts.init(Dom).setOption(option)
                },
                // 饼图 pie
                pie: function(Data, Dom) {
                    var title = Data[0].title
                    var Data = Data[0].data
                    var minValue = 0
                    var maxValue = 0
                    for (let i of Data) {
                        if (i.value > maxValue) {
                            maxValue = i.value
                        } else if (i.value < minValue) {
                            minValue = i.value
                        }
                    }
                    var option = {
                        visualMap: {
                            show: false,
                            min: minValue * 0.8,
                            max: maxValue * 1.4,
                            inRange: {
                                colorLightness: [1, 0]
                            }
                        },
                        series : [
                            {
                                name: '访问来源',
                                type: 'pie',
                                selectedMode: 'single',
                                selectedOffset: 30,
                                clockwise: true,
                                label: {
                                     normal: {
                                         textStyle: {
                                             fontSize: 20,
                                             color: '#333'
                                         }
                                     }
                                },
                                labelLine: {
                                     normal: {
                                         lineStyle: {
                                             color: '#333'
                                         }
                                     }
                                },
                                data: Data,
                                itemStyle: {
                                    normal: {
                                        color: '#c23531',
                                    }
                                }
                            }
                        ]
                    };
                    echarts.init(Dom).setOption(option)
                },
                // 气泡图 bubble
                bubble: function(Data, Dom) {
                    var title = Data[0].title
                    var list = []
                    var className = []
                    var divide = 10 //气泡大小倍数, 若无倍数 则除以 1
                    for (let i of Data) {
                        let e = {
                            name: i.class,
                            data: i.shuju,
                            type: 'scatter',
                            symbolSize: function(data) {
                                return Math.sqrt(data[2]) * divide;
                            },
                            label: {
                                emphasis: {
                                    show: true,
                                    formatter: function(param) {
                                        return param.data[3];
                                    },
                                    position: 'top'
                                }
                            },
                        }
                        list.push(e)
                        className.push(i.class)
                    }
                    var option = {
                            backgroundColor: 'transparent',
                            title: {
                                text: title //标题
                            },
                            legend: {
                                right: 10,
                                data: className //组名
                            },
                            xAxis: {
                                splitLine: {
                                    lineStyle: {
                                        type: 'dashed'
                                    }
                                }
                            },
                            yAxis: {
                                splitLine: {
                                    lineStyle: {
                                        type: 'dashed'
                                    }
                                },
                                scale: true
                            },
                            series: list
                        }
                        // 使用刚指定的配置项和数据显示图表。
                    echarts.init(Dom).setOption(option)
                },
                // funnel 漏斗图
                funnel: function(Data, Dom) {
                    var title = Data[0].title
                    var Data = Data[0].data
                    var className = []
                    for (var i of Data) {
                        className.push(i.name)
                    }
                    var option = {
                        title: {
                            text: title,
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c}%"
                        },
                        toolbox: {
                            feature: {
                                dataView: { readOnly: false },
                                restore: {},
                                saveAsImage: {}
                            }
                        },
                        legend: {
                            data: className
                        },
                        calculable: true,
                        series: [{
                            name: '漏斗图',
                            type: 'funnel',
                            left: '10%',
                            top: 60,
                            //x2: 80,
                            bottom: 60,
                            width: '80%',
                            // height: {totalHeight} - y - y2,
                            min: 0,
                            max: 100,
                            minSize: '0%',
                            maxSize: '100%',
                            sort: 'descending',
                            gap: 2,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside'
                                },
                                emphasis: {
                                    textStyle: {
                                        fontSize: 20
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    length: 10,
                                    lineStyle: {
                                        width: 1,
                                        type: 'solid'
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    borderColor: '#fff',
                                    borderWidth: 1
                                }
                            },
                            data: Data
                        }]
                    }
                    echarts.init(Dom).setOption(option)
                }
            },
            dataLoader: {
                bar: function(data, model, j) {
                    for (let i of model.fields) {
                        if (i.series === "x") {
                            if (i.type === "code") {
                                j.xAxis = []
                                for (let i2 of data.data.data) {
                                    j.xAxis.push(i2[i.code])
                                }
                            }
                        } else if (i.series === "y") {
                            if (i.type === "code") {
                                j.data = []
                                for (let i2 of data.data.data) {
                                    j.data.push(i2[i.code])
                                }
                            }
                        }
                    }
                    return j
                },
                line: function(data, model, j) {
                    for (let i of model.fields) {
                        if (i.series === "x") {
                            if (i.type === "code") {
                                j.xAxis = []
                                for (let i2 of data.data.data) {
                                    j.xAxis.push(i2[i.code])
                                }
                            }
                        } else if (i.series === "y") {
                            if (i.type === "code") {
                                j.data = []
                                for (let i2 of data.data.data) {
                                    j.data.push(i2[i.code])
                                }
                            }
                        }
                    }
                    return j
                },
                radar: function(data, model, j) {
                    for (let i of model.fields) {
                        if (i.series === "indicator") {
                            if (i.type === "code") {
                                j.indicator = []
                                for (let i2 of data.data.data) {
                                    var tempObj = {}
                                    tempObj.name = i2[i.code]
                                    j.indicator.push(tempObj)
                                }
                            }
                        } else if (i.series === "value") {
                            if (i.type = "code") {
                                j.value = []
                                for (let i2 of data.data.data) {
                                    j.value.push(i2[i.code])
                                }
                            }
                        }
                    }
                    return j
                },
                bubble: function(data, model, j) {
                    var finalList = []
                    for (let i of data.data.data) {
                        var tempList = []
                        for (let field of model.fields) {
                            for (let key in field) {
                                tempList.push(i[field[key]])
                            }
                        }
                        finalList.push(tempList)
                    }
                    j.class = tempList[4]
                    j.shuju = finalList
                    return j
                },
                pie: function(data, model, j) {
                    var tempData = []
                    for (let _data of data.data.data) {
                        var tempObj = {}
                        for (let field of model.fields) {
                            for (let key in field) {
                                tempObj[key] = _data[field[key]]
                            }
                        }
                        tempData.push(tempObj)
                    }
                    j.data = tempData
                    return j
                },
                funnel: function(data, model, j) {
                    var tempData = []
                    for (let _data of data.data.data) {
                        var tempObj = {}
                        for (let field of model.fields) {
                            for (let key in field) {
                                tempObj[key] = _data[field[key]]
                            }
                        }
                        tempData.push(tempObj)
                    }
                    j.data = tempData
                    return j
                }
            }
        });
        chart.prototype.init.prototype = chart.prototype;
        return chart;
    })();
    window.chart = chart;
})();
