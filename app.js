const Koa = require('koa')
const app = new Koa()
const cors = require('koa-cors');
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const response_formatter = require('./middlewares/response_formatter')
// 新增log4j
const logger = require('./util/log.util');

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)
// 使用koa-cors
app.use(cors());

app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())

app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))


// 新增log4j
app.use(async (ctx, next) => {
    //响应开始时间
    const start = new Date();
    //响应间隔时间
    let ms;
    try {
        //开始进入到下一个中间件
        await next();

        ms = new Date() - start;
        //记录响应日志
        logger.logResponse(ctx, ms);

    } catch (error) {

        ms = new Date() - start;
        //记录异常日志
        logger.logError(ctx, error, ms);
    }
});
// app.use(response_formatter)
app.use(response_formatter('^/users'));
app.use(response_formatter('^/index'));
// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app
