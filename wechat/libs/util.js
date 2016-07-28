/**
 * Created by youngboo on 2016/7/11.
 */
'use strict';
var fs = require('fs');
var Promise = require('bluebird');

exports.readFileAsync = function(fpath,encoding){
    return new Promise((resolve,reject)=>{
        fs.readFile(fpath,encoding,(err,content)=>{
            if(err){
                reject(err);
            }else{
                console.log("content"+content);
                resolve(content);
            }
        });
    });
};
exports.writeFileAsync = function(fpath,content){
    return new Promise((resolve,reject)=>{
        fs.writeFile(fpath,content,(err)=>{
            if(err){
                reject(err);
            }else{
                resolve();
            }
        });
    });
};