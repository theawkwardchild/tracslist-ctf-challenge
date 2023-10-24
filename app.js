var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var searchRouter = require('./routes/tractorSearch');
var detailsRouter = require('./routes/tractorDetails');






var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', indexRouter);
app.use('/tractorSearch', searchRouter);
app.use('/tractorDetails', detailsRouter);

app.use( ( req, res, next ) => {
  res.status( 404 ).sendFile( __dirname + '/public/404.html' );
});

module.exports = app;
