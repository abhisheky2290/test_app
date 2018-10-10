const Http = require('http');
var mysql = require('mysql');
// APP INCU.
const app = require('./app');
// CONSTENT.
const port = process.env.PORT || 5000;

  
var server = app.listen(port, () => {
  console.log('Server running at http://localhost:' + server.address().port);
});


