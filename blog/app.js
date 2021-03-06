/** ----- package ----- */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var routes = require('./routes/index');
var models = require('./models')
var app = express();
/* ----- ----- **/


/** ----- view engine setup ----- */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/* ----- ----- **/

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'YOLO',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));

app.use(express.static(path.join(__dirname, 'public')));

//currentUserの指定
app.use(function(req, res, next) {
  models.User.findById(req.session.userId)
    .then(function (user) {
      //以下global変数を指定
      res.locals = {currentUser: user}
      next()
    })
})



/** ----- route ----- */
//Top
app.use('/', routes);
/* ----- ----- **/


/** html */
app.get('/test', function(req, res){
    res.sendFile(path.join(__dirname + '/views/test.html'));
});


/** ----- error ----- */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('error/not_found', {title: "PAGE NOT FOUND"});
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

/* ----- ----- **/


module.exports = app;