(function() {
    "use strict";
    var  chart = (function() {
        var  chart = function(model, element, parent, setting) {
            return new  chart.prototype.init(model, element, parent, setting);
        }
         chart.extend =  chart.prototype.extend = $.extend;
         chart.prototype.init = function(model, element, parent, setting) {
            setting = setting || {};
            model = model || {};
            this.model = model;
            this.type = model.show_type;
            this.code = " chart";
            this.encode = model.code;
            this.data = setting.data;
            this.element = element;
            this.parent = parent;
            this.panel = this;
            this.loadData = this.load(this.data, this.model)
            this.build(this.loadData,this.element,this.type)

            return this;
        }
         chart.prototype.extend({
            buildChart: {
                 // 柱形图 bar
                 initBar : function(Data, Dom) {
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
                 initLine : function(Data, Dom) {
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
                 initRadar : function(Data, Dom) {
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
                 initPie : function(Data, Dom) {
                     var title = Data[0].title
                     var Data = Data[0].data
                     var option = {
                         title: {
                             text: title,
                         },
                         tooltip: {},
                         series: [{
                             name: 'pie',
                             type: 'pie',
                             selectedMode: 'single',
                             selectedOffset: 30,
                             clockwise: true,
                             label: {
                                 normal: {
                                     textStyle: {
                                         fontSize: 16,
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
                                     // opacity: 0.7, //透明度
                                     borderWidth: 2,
                                     borderColor: '#333'
                                 }
                             }
                         }]
                     };
                     echarts.init(Dom).setOption(option)
                 },
                 // 气泡图 bubble
                 initBubble : function(Data, Dom) {
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
                 initFunnel : function(Data, Dom) {
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
                                 dataView: {readOnly: false},
                                 restore: {},
                                 saveAsImage: {}
                             }
                         },
                         legend: {
                             data: className
                         },
                         calculable: true,
                         series: [
                             {
                                 name:'漏斗图',
                                 type:'funnel',
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
                             }
                         ]
                     }
                     echarts.init(Dom).setOption(option)
                 }
             },
            loadData: function(data, model) {
                 var result = []
                 var j = {}
                 j.title = model.code //标题
                 j.name = model.name  //内容
                 j.type = model.show_type //类型
                 if (model.show_type === "bar" || model.show_type === "line") {
                     for (let i of model.fields) {
                         if (i.series === "x") {
                             if (i.type === "code") {
                                 j.xAxis = []
                                 for (let i2 of data.data.data) {
                                     j.xAxis.push( i2[i.code] )
                                 }
                             }
                         } else if (i.series === "y") {
                             if (i.type === "code") {
                                 j.data = []
                                 for (let i2 of data.data.data) {
                                     j.data.push( i2[i.code] )
                                 }
                             }
                         }
                     }
                 } else if (model.show_type === "radar") {
                     for (let i of model.fields) {
                         if (i.series === "indicator") {
                             if (i.type === "code") {
                                 j.indicator = []
                                 for (let i2 of data.data.data) {
                                     var tempObj = {}
                                     tempObj.name = i2[i.code]
                                     j.indicator.push( tempObj )
                                 }
                             }
                         } else if (i.series === "value") {
                             if (i.type = "code") {
                                 j.value = []
                                 for (let i2 of data.data.data) {
                                     j.value.push( i2[i.code] )
                                 }
                             }
                         }
                     }
                 } else if (model.show_type === "pie" || model.show_type === "funnel") {
                     var tempData = []
                     for (let _data of data.data.data) {
                         var tempObj = {}
                         for (let field of model.fields) {
                             for(let key in field) {
                                 tempObj[key] = _data[field[key]]
                             }
                         }
                         tempData.push(tempObj)
                     }
                     j.data = tempData
                 } else if (model.show_type === "bubble") {
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
                 }
                 result.push(j)
                 return result
             },
            build: function(loadData, element, type) {
                if (type === "bar") {
                    this.buildChart.initBar(loadData, element)
                } else if (type === "line") {
                    this.buildChart.initLine(loadData, element)
                } else if (type === "radar") {
                    this.buildChart.initRadar(loadData, element)
                } else if (type === "pie") {
                    this.buildChart.initPie(loadData, element)
                } else if (type === "bubble") {
                    this.buildChart.initBubble(loadData, element)
                } else if (type === "funnel") {
                    this.buildChart.initFunnel(loadData, element)
                }
            },
            load: function(data, model) {
                return this.loadData(data, model)
            },
        });
         chart.prototype.init.prototype =  chart.prototype;
        return  chart;
    })();
    window. chart =  chart;
})();
