const Express = require('express');
const Morgan = require('morgan');
const BodyParser = require('body-parser');

const apiRoute = require('./api/api');
// const routeOrders = require('./api/routes/orders');
// const routeProducts = require('./api/routes/products');

const app = Express();
// ENV.
app.use(Morgan('dev'));
// BODY PARSER.
app.use(BodyParser.urlencoded({extended: false}))
app.use(BodyParser.json());
// CRUD.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE, OPTIONS");
    return res.status(200).json({});
  }
  next();
});
// ROUTE.
app.use('/api', apiRoute);
// app.use('/api/orders', routeOrders);
// app.use('/api/products', routeProducts);
/*
app.use((req, res, next) => {
  res.status(200).json({"message":"It Works!!"});
});
*/
// ERROR HNDL.
app.use((req, res, next) => {
    const error = new Error('Not Found!!!');
    error.status = 404;
    next(error);
  })
  .use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      error: {
        message: err.message
      }
    });
  });

module.exports = app;