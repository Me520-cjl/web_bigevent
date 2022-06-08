//导入数据库操作模块
const db = require('../db/index')
    //导入bcryptjs包
const bcrypt = require('bcryptjs')
    //注册新用户的处理函数
exports.regUser = (req, res) => {
    const userinfo = req.body;
    console.log(userinfo);
    if (!userinfo.username || !userinfo.password) {
        return res.send({ status: 1, messge: '用户名或密码不合法' })
    }
    //res.send('requser OK');
    //定义SQL语句，查询用户名是否被占用
    const sqlStr = 'select * from ev_users where username=?';
    db.query(sqlStr, userinfo.username, (err, results) => {
        //判断SQL语句失败
        if (err) {
            return res.send({ status: 1, messge: err.message })
        }
        //判断用户名是否被占用
        if (results.length > 0) {
            return res.send({ status: 1, messge: '用户名被占用，请更换其他用户名' })
        }
        //TODO :用户名可以使用，继续后面的流程调用bcrypt.hashSync()对密码加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10);
        console.log(userinfo);
        //定义插入新用户的ＳＱＬ语句
        const sql = 'insert into ev_users set ?';
        db.query(sql, { username: userinfo.username, password: userinfo.password, nickname: userinfo.nickname }, (err, results) => {
            //判断SQL语句失败
            if (err) {
                return res.send({ status: 1, messge: err.message })
            }
            //SQL语句执行成功，但是影响行数不为1
            if (results.affectedRows !== 1) {
                return res.send({ status: 1, messge: '注册用户失败，请稍候再试' })
            }
            //注册成功
            res.send({ status: 0, message: '注册成功' });
        })
    })
}





//注册新用户的处理函数
exports.login = (req, res) => {
    if (!userinfo.username || !userinfo.password) {
        return res.send({ status: 1, messge: '用户名或密码不合法' })
    }
    res.send('requser OK');
}