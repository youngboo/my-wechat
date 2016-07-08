/**
 * Created by youngboo on 2016/7/8.
 */
'use strict';
var Koa = require("koa");

var app = new Koa();
app.use(function *(next){
    var query = this.query.echo;
    this.body = query;
    //next();
});
app.listen(1234);
