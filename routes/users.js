var express = require('express');
var router = express.Router();
var multer = require('multer');

var multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        var fileFormat = file.originalname.split('.');
        cb(null, file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1]);
    }
})
// var upload = multer({dest: 'uploads/'})
var upload = multer({
    storage: multerStorage
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users')
  // res.send('respond with a resource wpf');
});
router.post('/', upload.single('inputFile'), function (req, res, next) {
    res.send(`<a href=${req.file.path}>文档</a>`)
})

module.exports = router;
