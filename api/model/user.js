const Express = require('express');
const router = Express.Router();
var Q = require('q');
var db = require('../../server');
var _table = 'user';

function get() {
  conn=db.connectDatabase();
  return Q.Promise(function (resolve, reject, notify) {
    var sql='SELECT * FROM '+_table;
    conn.query(sql, function(err, result,fields) {
      if (err) {
        reject(err);
      }
      else {
        resolve(result);
      }
    });    
  });
}

function getById(req) {
  conn=db.connectDatabase();
  var where='';
  if (req.params.id != "")
    where=where+' where user_id='+req.params.id;

  return Q.Promise(function (resolve, reject, notify) {
    var sql='SELECT * FROM '+_table+where;
    conn.query(sql, function(err, result,fields) {
      if (err) {
        reject(err);
      }
      else {
        resolve(result);
      }
    });    
  });
}

module.exports.get = get;
module.exports.getById = getById;