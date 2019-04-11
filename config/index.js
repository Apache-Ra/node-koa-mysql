/**
 ├── 启动配置文件
 └── index.config.js
 └── 2019-04-10
 */

let dev_env = require('./dev_env.config');
let pro_env = require('./pro_env.config');
//根据不同的NODE_ENV，输出不同的配置对象，默认输出development的配置对象
module.exports = {
    development: dev_env,
    production: pro_env
}[process.env.NODE_ENV || 'production']