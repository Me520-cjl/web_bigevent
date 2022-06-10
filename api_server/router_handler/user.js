//导入数据库操作模块
const db = require('../db/index')
    //导入bcryptjs包
const bcrypt = require('bcryptjs')
    //注册新用户的处理函数
const config = require('../config')

const jwt = require('jsonwebtoken')
exports.regUser = (req, res) => {
    const userinfo = req.body;
    console.log(userinfo);
    if (!userinfo.username || !userinfo.password) {
        // return res.send({ status: 1, messge: '用户名或密码不合法' })
        return res.cc('用户名或密码不合法');

    }
    //res.send('requser OK');
    //定义SQL语句，查询用户名是否被占用
    const sqlStr = 'select * from ev_users where username=?';
    db.query(sqlStr, userinfo.username, (err, results) => {
        //判断SQL语句失败
        if (err) {
            // return res.send({ status: 1, messge: err.message })
            return res.cc(err)
        }
        //判断用户名是否被占用
        if (results.length > 0) {
            // return res.send({ status: 1, messge: '用户名被占用，请更换其他用户名' })
            return res.cc('用户名被占用，请更换其他用户名');
        }
        //TODO :用户名可以使用，继续后面的流程调用bcrypt.hashSync()对密码加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10);
        console.log(userinfo);
        //定义插入新用户的ＳＱＬ语句
        const sql = 'insert into ev_users set ?';
        db.query(sql, { username: userinfo.username, password: userinfo.password, nickname: userinfo.nickname }, (err, results) => {
            //判断SQL语句失败
            if (err) {
                // return res.send({ status: 1, messge: err.message })
                return res.cc(err)
            }
            //SQL语句执行成功，但是影响行数不为1
            if (results.affectedRows !== 1) {
                // return res.send({ status: 1, messge: '注册用户失败，请稍候再试' })
                return res.cc('注册用户失败，请稍候再试');

            }
            //注册成功
            res.cc('注册成功', 0)
        })
    })
}


//注册新用户的处理函数
exports.login = (req, res) => {
    //接收表单数据
    const userinfo = req.body;
    //定义SQL语句，根据用户名查询信息
    const sql = 'select * from ev_users where username=?';
    //执行语句
    db.query(sql, userinfo.username, (err, results) => {
        //执行失败
        if (err) {
            return res.cc(err)
        }
        //执行成功，但是查询到数据不等于1
        if (results.length !== 1) {
            return res.cc('登录失败')
        }
        //TODO:判断用户输入的登录密码是否和数据库中的相同
        //拿着用户输入的密码与数据库中的密码进行对比
        const comparaResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!comparaResult) {
            return res.cc('登录失败')
        }
        //TODO： 登录成功，生成Token字符串
        const user = {...results[0], password: '', user_pic: '' };
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '10h',
        })
        res.send({
            status: 0,
            message: '登录成功！',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer ' + tokenStr,
        })
        console.log(tokenStr);

    })
}