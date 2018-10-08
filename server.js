const Http = require('http');
var mysql = require('mysql');
// APP INCU.
const app = require('./app');
// CONSTENT.
const port = process.env.PORT || 5000;
const db_user = process.env.DB_USR || null;
const db_password = process.env.DB_PWD || null;
const db_hostname = process.env.DB_HOST || null;
const database = process.env.DATABASE_NAME || null;
var db;
// DB CONN.
const dbConfig={
  host: db_hostname,
  user: db_user,
  password: db_password,
  database: database
}
connectDatabase();
function connectDatabase() {
  if (!db) {
    db = mysql.createConnection(dbConfig);

    db.connect(function(err){
        if(err) {
          console.log("UNABLE TO CONNECT DB...");
        } else {
          const server = Http.createServer(app);
          console.log("SUCCESS TO CONNECT DB...");
          server.listen(port, () => console.log(`Listening at: http://localhost:${port}/`));
        }
    });
  }
  return db;
}

module.exports.connectDatabase = connectDatabase;

