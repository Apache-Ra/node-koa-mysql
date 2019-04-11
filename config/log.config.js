/**
 ├── 日志配置文件
 └── log.config.js
 └── 2019-04-10
 */
let path = require('path');

//日志根目录
let baseLogPath = path.resolve(__dirname, '../logs')

//错误日志目录
let errorPath = "/error";
//错误日志文件名
let errorFileName = "error";
//错误日志输出完整路径
let errorLogPath = baseLogPath + errorPath + "/" + errorFileName;
//var errorLogPath = path.resolve(__dirname, "../logs/error/error");

//响应日志目录
let responsePath = "/response";
//响应日志文件名
let responseFileName = "response";
//响应日志输出完整路径
let responseLogPath = baseLogPath + responsePath + "/" + responseFileName;
//var responseLogPath = path.resolve(__dirname, "../logs/response/response");
module.exports = {
    //日志格式等设置
    appenders:
        {
            "rule-console": {"type": "console"},
            "errorLogger": {
                "type": "dateFile",
                "filename": errorLogPath,
                "pattern": "-yyyy-MM-dd-hh.log",
                "alwaysIncludePattern": true,
                "encoding": "utf-8",
                "maxLogSize": 1000,
                "numBackups": 3,
                "path": errorPath
            },
            "resLogger": {
                "type": "dateFile",
                "filename": responseLogPath,
                "pattern": "yyyy-MM-dd-hh.log",
                "alwaysIncludePattern": true,
                "encoding": "utf-8",
                "maxLogSize": 1000,
                "numBackups": 3,
                "path": responsePath
            },
        },
    //供外部调用的名称和对应设置定义
    categories: {
        "default": {"appenders": ["rule-console"], "level": "all"},
        "resLogger": {"appenders": ["resLogger"], "level": "info"},
        "errorLogger": {"appenders": ["errorLogger"], "level": "error"},
        "http": {"appenders": ["resLogger"], "level": "info"}
    },
    "baseLogPath": baseLogPath
}