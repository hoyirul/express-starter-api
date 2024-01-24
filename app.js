require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser= require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggers/swagger.json');

var options = {
  explorer: false
};

var indexRouter = require('./routes/index.route');
var apiRoutes = require('./routes/api.route');

var app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRoutes);

// add route for swagger document API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

module.exports = app;
