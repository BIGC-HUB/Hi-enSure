var log = function() {
    console.log.apply(console, arguments)
}
// 查看对应关系
var forModel = function(model, data) {
    for (let field of model.main.fields) {
        // log(field.name, field.code)
        // log(data[field.code])
    }
}
// forModel(modelTest, dataTest)

form(modelTest, $('.form')[0], null, {"data":dataTest})
