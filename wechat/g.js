/**
 * Created by youngboo on 2016/7/11.
 */
'use strict'
var sha1 = require("sha1");

//access_token需要两个小时更新一次，而且最好由单一实例去获取并存储。
var prefix = "https://api.weixin.qq.com/cgi-bin/";
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var api = {
    accessToken : prefix+"token?grant_type=client_credential"
};

function Wechat(config){
    //读取access_token，如果过期，则请求微信接口获取
    this.appID = config.wechat.appID;
    this.appsecret = config.wechat.appsecret;

    this.getAccessToken = config.wechat.getAccessToken;
    this.saveAccessToken = config.wechat.saveAccessToken;

    this.getAccessToken()
        .then((data)=>{
            try{
                data = JSON.parse(data);

            }catch (e){
                console.log(e.message);
                return this.updateAccessToken();
            }
            if(this.isValidAccessToken(data)){
                Promise.resolve(data);
            }else{
                return this.updateAccessToken();
            }

        })
        .then((data)=>{
            this.saveAccessToken(data);
        })


};
Wechat.prototype.isValidAccessToken = function(token){

    if(!token || token.access_token == null || token.expires_in == null){
        return false;
    }else{
        let expTime = new Number(token.expires_in) -new Date().getTime();
        console.log(expTime);
        return expTime > 0;
    }
};

Wechat.prototype.updateAccessToken = function(){
    var appID = this.appID;
    var appsecret = this.appsecret;
    var url = api.accessToken +"&appid="+appID +"&secret="+appsecret;
    console.log(url);
    return new Promise((resolve,reject)=>{
        request({url:url,json:true}).then(function(response){
            let data = response.body;
            let now = new Date().getTime();
           // console.log(response.body);
            let expires_in = now + ((data.expires_in-20)*1000);
            data.expires_in = expires_in;
            resolve(data);
        });
    });
};

module.exports = function (config){
  return function *(next){
     // console.log(this.query);
      var wechat = new Wechat(config);

      var token = config.wechat.token;
      var signature = this.query.signature;
      var echostr = this.query.echostr;
      var timestamp = this.query.timestamp;
      var nonce = this.query.nonce;

      var str = [token,timestamp,nonce].sort().join('');
      var sha = sha1(str);
     // console.log(sha);
      if(sha === signature){
          this.body = echostr +'';
      }else {
          this.body = 'wrong';
      }
  }
};