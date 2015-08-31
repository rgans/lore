var config = require('./config');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

global.require_r = function(p){
    return require(path.join(__dirname, p));
};

var User = require_r('/framework/security/user');

var app = express();

app.set("x-powered-by", false);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'l@lubem@c', saveUninitialized:false, resave:false, store: new MongoStore({ url: 'mongodb://localhost/lore' })}));

app.use(function loadUser(req, res, next) {
  req.session.user = req.session.user || new User();
  req.user = app.locals.user = req.session.user;
  console.log(req.user);
  next();
});

[
    { path: '/owner/institution', controller: require('./routes/owner/institution') },
    { path: '/owner', controller: require('./routes/owner/index') }
].forEach(function(r){
    app.use(r.path, r.controller);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Founddddddd');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
