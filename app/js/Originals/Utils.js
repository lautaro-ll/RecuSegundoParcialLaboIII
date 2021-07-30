"use strict";
var Utils = /** @class */ (function () {
    function Utils() {
        this.table = this.$("table");
    }
    Utils.prototype.$ = function (element) {
        return document.getElementById(element);
    };
    return Utils;
}());
