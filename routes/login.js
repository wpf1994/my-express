/**
 * Created by perfect on 2017/4/28.
 */
var express = require('express');
var router = express.Router();
var client = require('../lib/db')
var comparePassword = require('../middlewares/comparePassword');
var checkNotLogin = require('../middlewares/check').checkNotLogin;


router.get('/', checkNotLogin, function (req, res, next) {
    res.render('login', {title: '登录'})
})

router.post('/', function (req, res, next) {
    //查询用户
    client.query("select * from users where name = $1", [req.body.name]).then(result => {
        console.log(result.rows)
        if (result.rows.length > 0) {
            if (result.rows[0].password === comparePassword(req.body.password)){
                req.session.user = req.body.name
                res.redirect('/')
            }else{
                res.send('密码错误');
            }
        }else {
            res.send('没有该用户');
        }
    })
})

module.exports = router