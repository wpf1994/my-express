/**
 * Created by perfect on 2017/4/30.
 */
var crypto = require('crypto'); //加密库

module.exports = function (data) {
    var secretToken = 'perfect';
    var Signture = crypto.createHmac('sha1', secretToken);//定义加密方式
    Signture.update(data);
    var result=Signture.digest().toString('base64');//生成的密文后将再次作为明文再通过pbkdf2算法迭代加密；
    return result;
}