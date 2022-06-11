const joi = require('joi')
    /**
     * string() 值必须是字符串
     * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
     * min(length) 最小长度
     * max(length) 最大长度
     * required() 值是必填项，不能为 undefined
     * pattern(正则表达式) 值必须符合正则表达式的规则
     */

//验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const nickname = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
const id = joi.number().integer().min(1).required()
const email = joi.string().email().required()
    // 定义 分类名称 和 分类别名 的校验规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()
    //// dataUri() 指的是如下格式的字符串数据：
    // data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avatar = joi.string().dataUri().required()

//注册和登录表单的验证规则
exports.reg_login_schema = {
    //表示需要对req.body中的数据进行验证
    body: {
        username,
        password,
    },
}

//更新用户信息验证
exports.update_userinfo_schema = {
    //表示需要对req.body中的数据进行验证
    body: {
        username,
        nickname,
        id,
        email
    },
}

//更改密码验证
exports.update_password_schema = {
    //表示需要对req.body中的数据进行验证
    body: {
        // 使用 password 这个规则，验证 req.body.oldPwd 的值
        oldPwd: password,
        // 使用 joi.not(joi.ref('oldPwd')).concat(password) 规则，验证 req.body.newPwd的值
        // 解读：
        // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
        // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
        // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
        newPwd: joi.not(joi.ref('oldPwd')).concat(password),

    },
}

//更新用户头像验证
exports.update_avatar_schema = {
    //表示需要对req.body中的数据进行验证
    body: {
        avatar
    },
}

// 校验规则对象 - 添加分类
exports.add_cate_schema = {
    body: {
        name,
        alias,
    },
}

// 校验规则对象 - 删除分类
exports.delete_cate_schema = {
    params: {
        id,
    },
}

// 校验规则对象 - 根据 Id 获取分类
exports.get_cate_schema = {
    params: {
        id,
    },
}

// 校验规则对象 - 更新分类
exports.update_cate_schema = {
    body: {
        id,
        name,
        alias,
    },
}