//导入express
const express = require('express')

//导入验证数据合法性模块
const expressJoi = require('@escook/express-joi')
    // 导入文章分类的验证模块
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/user')

//创建路由对象
const router = express.Router()


const artcate_handler = require('../router_handler/artcate')

//获取文章列表的数据
router.get('/cate', artcate_handler.getArticleCates)

// 新增文章分类的路由
router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArticleCates)

// 删除文章分类的路由
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artcate_handler.deleteCateById)

//根据ＩＤ获取文章数据
router.get('/cates/:id', expressJoi(get_cate_schema), artcate_handler.getArticleById)

// 更新文章分类的路由
router.post('/updatecate', expressJoi(update_cate_schema), artcate_handler.updateCateById)

module.exports = router