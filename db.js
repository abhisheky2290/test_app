const port = process.env.PORT || 5000;
const db_user = process.env.DB_USR || null;
const db_password = process.env.DB_PWD || null;
const db_hostname = process.env.DB_HOST || null;
const database = process.env.DATABASE_NAME || null;
// DB CONN.
const dbConfig={
  host: db_hostname,
  user: db_user,
  password: '',
  database: database
}
var knex = require('knex')({
    client: 'mysql',
    connection: dbConfig,
    debug: true
  });

function Connection() {
  this.knex = knex;
}
  


module.exports.knex = knex;