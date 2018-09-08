/**
 * Created by perfect on 2017/4/28.
 */
module.exports = {
    checkLogin: function (req, res, next) {
        if (!req.session.user){
            return res.redirect('/login')
        }
        next();
    },
    checkNotLogin: function (req, res, next) {
        if(req.session.user){
            // res.send('已登录');
            return res.redirect('back');
        }
        next();
    }
}