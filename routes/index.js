/**
 ├── routes
 └── index.js
 */
const Router = require('koa-router')
const ArticleController = require('../controllers/article')

const router = new Router({
  prefix: '/api'
})

/**
 * 文章接口
 */
// 创建文章接口（路由）
router.post('/article/add', ArticleController.create);
// 获取文章详情接口（路由）
router.get('/article/detail', ArticleController.detail);

module.exports = router
