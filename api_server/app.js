//导入express
const express = require('express')


//创建服务器实例
const app = express();



//导入并配置cors中间件
const cors = require('cors');
app.use(cors())

// 配置解析表单数据的中间件，注意：这个中间件，只能解析 application/x-www-form-urlencoded 格式的表单数据

app.use(express.urlencoded({ extended: false }))

// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))

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

//一定要在路由之前配置解析Token的中间件
//解析token的中间件
const expressJWT = require('express-jwt')
    //导入配置文件
const config = require('./config')
    //使用.unless({path:[/^\api\//]})指定哪些接口不需要Token验证
app.use(expressJWT({
    secret: config.jwtSecretKey
}).unless({ path: [/^\/api/] }))

//导入并注册用户路由模块
const usrRouter = require('./router/user')
const userinfoRouter = require('./router/userinfo')
const artCateRouter = require('./router/artcate')
const articleRouter = require('./router/article')

//注册路由
app.use('/api', usrRouter)
app.use('/my', userinfoRouter)
app.use('/my', artCateRouter)
app.use('/my/article', articleRouter)


const joi = require('joi')
    //定义错误级别中间件
    //此中间件要放在路由注册之后
app.use(function(err, req, res, next) {
    //数据验证错误
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
    }
    //捕获身份认证失败的错误
    console.log(err.name);
    if (err.name === 'UnauthorizedError') {
        return res.cc('身份认证失败')
    }
    //未知错误
    res.cc(err)
})




app.get('/', (req, res) => {
    res.send('大事件项目')
})



//启动服务器
app.listen(3000, () => {
    console.log('api server runing at http://127.0.0.1:3000');
})