//导入express
const express = require('express')

//导入并注册用户路由模块
const usrRouter = require('./router/user')
    //创建服务器实例
const app = express();


//导入并配置cors中间件
const cors = require('cors');
app.use(cors())

// 配置解析表单数据的中间件，注意：这个中间件，只能解析 application/x-www-form-urlencoded 格式的表单数据

app.use(express.urlencoded({ extended: false }))



//一定要在路由之前，封装res.cc函数
app.use((req, res, next) => {
    //status默认值为1 ，表示失败的情况
    //err的值，可能是一个错误对象，也可能是一个错误的描述字符串
    res.cc = function(err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next();
})



app.use('/api', usrRouter)

//此中间件要放在路由注册之前
const joi = require('joi')
    //错误中间件
app.use(function(err, req, res, next) {
    //数据验证错误
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
    }
    //未知错误
    res.cc(err)
})

app.get('/', (req, res) => {
        res.send('Hello World!')
    })
    //启动服务器
app.listen(3000, () => {
    console.log('api server runing at http://127.0.0.1:3000');
})