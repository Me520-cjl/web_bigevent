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
//导入路由
// app.use(express.json());

app.use(express.urlencoded({ extended: false }))

app.use('/api', usrRouter)





app.get('/', (req, res) => {
        res.send('Hello World!')
    })
    //启动服务器
app.listen(3000, () => {
    console.log('api server runing at http://127.0.0.1:3000');
})





// var http = require('http');
// http.createServer(function(req, res) {
//     console.log('hello world' + req.url);
//     if (req.url === "/favicon.ico") return;
//     //阻止响应
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('Hello world\n');
// }).listen(3000, '127.0.0.1');
// console.log('Sever running at http://127.0.0.1:3000/');

// const express = require('express')
// const app = express()
// const port = 3000



// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })