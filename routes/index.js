var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;
// var client = require('../lib/db');

/* GET home page. */
router.get('/', checkLogin, function(req, res, next) {
    res.render('index', { title: 'my-express' });
});

router.get('/logout', function (req, res, next) {
    delete req.session.user;
    res.redirect('/')
})

module.exports = router;
