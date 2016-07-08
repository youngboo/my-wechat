/**
 * Created by youngboo on 2016/7/8.
 */
'use strict';
var Koa = require('koa');
var sha1 = require("sha1");

var config = {
    wechat:{
    "appID":"wxdda5d41ae96e47b4",
    "appsecret":"d4624c36b6795d1d99dcf0547af5443d",
    "token":"wf3u4yywnyyge1c0bkwsjjart0gzvcn0"
    }
};
var app = new Koa();
app.use(function *(next){
    console.log(this.query);

    var token = config.wechat.token;
    var signature = this.query.signature;
    var echostr = this.query.echostr;
    var timestamp = this.query.timestamp;
    var nonce = this.query.nonce;

    var str = [token,timestamp,nonce].sort().join('');
    var sha = sha1(str);
    console.log(sha);
    if(sha === signature){
        this.body = echostr +'';
    }else {
        this.body = 'wrong';
    }
});
const PROT =1234;
app.listen(PROT);
console.log('listening:'+PROT);