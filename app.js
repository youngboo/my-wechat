/**
 * Created by youngboo on 2016/7/8.
 */
'use strict';
var Koa = require('koa');
var wechat = require("./wechat/g.js");

var config = {
    wechat:{
    "appID":"wxdda5d41ae96e47b4",
    "appsecret":"d4624c36b6795d1d99dcf0547af5443d",
    "token":"wf3u4yywnyyge1c0bkwsjjart0gzvcn0"
    }
};
var app = new Koa();
app.use(wechat(config));
const PROT =1234;
app.listen(PROT);
console.log('listening:'+PROT);