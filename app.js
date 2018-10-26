const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser= require('body-parser');
const indexRouter = require('./routes/index');
const { db } = require('./lib/db');

const app = express();

async function startServer() {

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({extended: true}))

  await db.connect();
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.use('/api', indexRouter);

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });

  const port = process.env.PORT || 5000;
  app.set('port', port);
  app.listen(port, () => console.log(`App listening on port ${port}!`));
}

startServer().catch(console.log);