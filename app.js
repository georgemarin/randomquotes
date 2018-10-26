const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser= require('body-parser');
const indexRouter = require('./routes/index');
const { db } = require('./lib/db');

const app = express();

(async function startServer() {

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({extended: true}))
  app.use('/api', indexRouter);

// catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

// error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  await db.connect();

    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, 'client/build/index.html'));
    });

}());



module.exports = app;
