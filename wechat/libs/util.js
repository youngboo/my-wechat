/**
 * Created by youngboo on 2016/7/11.
 */
'use strict';
var fs = require('fs');
var Promise = require('bluebird');

exports.readFileAsync = function(fpath,encoding){
    return new Promise(function(resolve,reject){
        fs.readFile(fpath,encoding,(err,content)=>{
            if(err){
                reject(err);
            }else{
                resolve(content);
            }
        });
    });
}