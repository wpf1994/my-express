var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var moment = require('moment');
var redisStore = require('connect-redis')(session);

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var signIn = require('./routes/signIn');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var redisSessionStoreConfig = {
    host: '127.0.0.1',
    port: '6379'
}
var sessionConfig = {
    secret: 'my-express',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 100000
    },
    store: new redisStore(redisSessionStoreConfig)
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sessionConfig.cookie.secure = true // serve secure cookies
}
app.use(session(sessionConfig))
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));

app.use(function (req, res, next) {
    var _user = req.session.user;
    if (_user) {
        app.locals.user = _user
    }
    next();
})

app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/signIn', signIn);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
