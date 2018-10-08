const Express = require('express');
const routeUser = require('./routes/user');

const app = Express();

app.use('/user', routeUser);

module.exports = app;