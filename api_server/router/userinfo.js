//导入express
const express = require('express')

//导入验证数据合法性模块
const expressJoi = require('@escook/express-joi')
const { update_userinfo_schema, update_avatar_schema, update_password_schema } = require('../schema/user')

//创建路由对象
const router = express.Router()


const userinfo_handler = require('../router_handler/userinfo')



//获取用户基本信息
router.get('/userinfo', userinfo_handler.getUserInfo)

//更新用户基本信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)

//更改密码
router.post('/updatepsw', expressJoi(update_password_schema), userinfo_handler.updatePassword)


//更改头像
router.post('/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)

module.exports = router