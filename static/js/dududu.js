(function() {
    "use strict";
    var  chart = (function() {
        var  chart = function(model, element, parent, setting) {
            return new  chart.prototype.init(model, element, parent);
        }
         chart.extend =  chart.prototype.extend = $.extend;
         chart.prototype.init = function(model, element, parent, setting) {
            setting = setting || {};
            model = model || {};
            this.type = "";
            this.code = " chart";
            this.data = setting.data;
            this.element = element;
            this.model = model;
            this.parent = parent;
            this.panel = this;
            this.encode = model.code;

            return this;
        }
        // build load
         chart.prototype.extend({
            build: function() {
            },
            load: function() {
            },
        });
        //
         chart.prototype.init.prototype =  chart.prototype;
        return  chart;
    })();
    window. chart =  chart;
})();
