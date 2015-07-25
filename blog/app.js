var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var routes = require('./routes/index');
var Question = require('./routes/index');
var User = require('./routes/index');
var Tag = require('./routes/index');
var Category = require('./routes/index');
var Answer = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

/** route */
app.use('/', routes);
app.use('/question/:id', Question);
app.use('/question/:id/answer', Question);
app.use('/question/create', Question);
app.use('/question/edit/:id', Question);
app.use('/question/delete/:id', Question);
app.use('/register', User);
app.use('/tag/index', Tag);
app.use('/tag/:id', Tag);
app.use('/tag/create', Tag);
app.use('/category/index', Category);
app.use('/category/:id', Category);
app.use('/category/create', Category);
app.use('/user', User);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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