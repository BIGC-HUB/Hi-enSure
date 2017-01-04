var log = function() {
    console.log.apply(console, arguments)
}
// 查看对应关系
var forModel = function(model, data) {
    for (let field of model.main.fields) {
        // log(field.name, field.type, field.code, data[field.code])
        // log(data[field.code])
    }
}
// forModel(modelTest, dataTest)

demo = form(modelTest, $('#demo')[0], null, {
    "data":dataTest,
    "title" : "组件 - FORM 示例",
    // 列 1-8
    // "column": 4
})
