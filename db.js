var mysql = require('mysql');
const app = require('./app');
const port = process.env.PORT || 5000;
const db_user = process.env.DB_USER || null;
const db_password = process.env.DB_PASSWORD || null;
const db_hostname = process.env.DB_HOST || null;
const database = process.env.DATABASE || null;
// DB CONN.

var con = mysql.createConnection({
  host: db_hostname,
  user: db_user,
  password: "",
  database: database
});

function connection(){
  var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_tutorail"
});

conn.connect(function(err) {
  if (err) {
   console.log("UNABLE TO CONNECT DB...");
  
  }else{
    const server = Http.createServer(app);
    console.log("SUCCESS TO CONNECT DB...");
    server.listen(port, () => console.log(`Listening at: http://localhost:${port}/`));
  }
  
});
}
