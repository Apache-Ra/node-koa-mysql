const ApiError = require('../error/ApiError')
const ApiErrorNames = require('../error/ApiErrorNames')

const Router = require('koa-router')
// 接口前缀
const router = new Router({prefix: '/users'})

router.post('/login', function (ctx, next) {
  //获取post提交的数据
  let req = ctx.request.body
  if(req.userName != 'Ra'){
    throw new ApiError(ApiErrorNames.USER_NOT_EXIST);
    ctx.response.status = 400;
    ctx.body = {
      code: 200,
      msg: '不存在',
    }
  } else if(req.userName=='Ra' && req.passWord == '123456'){
    ctx.response.status = 200;
    ctx.body = {
      code: 200,
      token: 'dongLeiTestTOKENKey',
      msg: '成功',
    }
  } else {
    ctx.response.status = 416;
    ctx.body = {
      code: 200,
      msg: '用户名或密码错误',
    }
  }
})

//测试接口
router.get('/getUser', function (ctx, next) {
  //如果id != 1抛出API 异常
  if (ctx.query.id != 1) {
    throw new ApiError(ApiErrorNames.USER_NOT_EXIST);
  }
  ctx.body = {
    username: '测试',
    age: 1
  }
})

module.exports = router
