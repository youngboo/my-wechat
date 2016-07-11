/**
 * Created by youngboo on 2016/7/11.
 */
'use strict'
var sha1 = require("sha1");
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
function Wechat(config){
    //读取access_token，如果过期，重写获取，如果没过期，直接读取。
};

module.exports = function (config){
  return function *(next){
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