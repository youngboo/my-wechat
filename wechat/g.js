/**
 * Created by youngboo on 2016/7/11.
 */
'use strict'
var sha1 = require("sha1");
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var prefix = "https://api.weixin.qq.com/cgi-bin/";
var api = {
    accessToken : prefix+"?grant_type=client_credential"
};
function Wechat(config){
    //读取access_token，如果过期，则请求微信接口获取
    var that = this;
    this.appID = config.wechat.appID;
    this.appsecret = config.wechat.appsecret;

    try{
        this.readAccessToken(function(){

        });
    }catch (e){

    }


};
Wechat.prototype.updateAccessToken = function(){
    var appID = this.appID;
    var appsecret = this.appsecret;
    var url = api.accessToken +"&appid="+appID +"&appsecret="+appsecret;
    request({url:url,json:true}).then(function(resolve,reject){
        var data = response[1];
        var now = new Date().getTime();
        var expires_in = now + (data.expires_in-20)*1000;
        data.expires_in = expires_in;
        resolve(data);
    });
}
module.exports = function (config){
  return function *(next){
      var Wechat = new Wechat();

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
  }
};