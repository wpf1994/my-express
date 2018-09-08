/**
 * Created by perfect on 2017/4/28.
 */
var express = require('express');
var router = express.Router();
var client = require('../lib/db')
var uuidV1 = require('uuid/v1');
var moment = require('moment');

var setPassword = require('../middlewares/comparePassword')

router.get('/', function (req, res, next) {
    res.render('signIn');
})

router.post('/', function (req, res, next) {
    var user = {};
    user["id"] = uuidV1();
    user["name"] = req.body.name;
    user["password"] = setPassword(req.body.password);
    user["created_at"] = moment().format('YYYY-MM-DD HH:mm:ss');
    client.query("insert into users (id, name, password, created_at) values ($1, $2, $3, $4)", [user.id, user.name, user.password, user.created_at]);
    req.session.user = req.body.name
    res.redirect('/');
})

module.exports = router