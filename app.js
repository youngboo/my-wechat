/**
 * Created by youngboo on 2016/7/8.
 */
'use strict';
var Koa = require('koa');
var wechat = require("./wechat/g.js");
var path = require('path');
var wechat_file = path.join(__dirname,'./config/wechat.txt');
var config = {
    wechat:{
        "appID":"wxdda5d41ae96e47b4",
        "appsecret":"d4624c36b6795d1d99dcf0547af5443d",
        "token":"wf3u4yywnyyge1c0bkwsjjart0gzvcn0",
        getAccessToken:function(){
            return util.readFileAsync(wechat_file,"utf-8");
        },
        saveAccessToken:function(){
            return util.readFileAsync(wechat_file);
        }
    }
};
var app = new Koa();
app.use(wechat(config));
const PROT =1234;
app.listen(PROT);
console.log('listening:'+PROT);