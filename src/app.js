var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var testsRouter = require('./routes/tests');
var analysisRouter = require('./routes/analysis');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/tests', testsRouter);

// lastResult'ı app.locals ile paylaş (analysis bunu okuyacak)
app.use(function(req, res, next) {
  if (typeof testsRouter._getLastResult === 'function') {
    app.locals.lastResult = testsRouter._getLastResult();
  }
  next();
});

app.use('/analysis', analysisRouter);

app.get("/results", function(req, res) {
  const attempt = req.app.locals.lastAttempt;

  if (!attempt) {
    return res.render("results", {
      title: "Test Sonucu",
      empty: true
    });
  }

  return res.render("results", {
    title: "Test Sonucu",
    empty: false,
    testTitle: attempt.testTitle,
    correctCount: attempt.correctCount,
    wrongCount: attempt.wrongCount,
    blankCount: attempt.blankCount
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
