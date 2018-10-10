const Express = require('express');
const router = Express.Router();
var Q = require('q');
var knex = require('../../db').knex;
var _table = 'user';
var _ = require('lodash');

function get() {
  return Q.Promise(function (resolve, reject, notify) {
    var sql = knex(_table).select('*')
      .then(function (result) {
      resolve(result)
    })
    .catch (function (err) {
      reject(err)
    });
       
  });
}

function getById(param) {
  var where = {};
  if (param && param.user_id != null)
    where['user_id'] = param.user_id;
  return Q.Promise(function (resolve, reject, notify) {
    var sql = knex(_table).select('*')
      .where(where)
      .then(function (result) {
       resolve(result)
    })
    .catch (function (err) {
      reject(err)
    });   
  });
}

function save(fields, where) {
  return Q.Promise(function (resolve, reject, notify) {
    if (!_.isEmpty(where) && _.isObject(where)) {
      //-- UPDATE RECORD --
      return knex(_table)
      .where(where)
      .update(fields)
      .then(function (result) {
        console.log('result update()', result);
        resolve(result);
      }).catch (reject);

    } else {
      //-- INSERT RECORD --
      
      return knex(_table)
      .insert(fields)
      .then(function (result) {
        resolve(result);
      }).catch (reject);
    }
  });
}

function getEntity(data) {
  var oneUser = {};
  if (data && data.user_id != null)
    oneUser.user_id = data.user_id;
  if (data && data.usertype != null)
    oneUser.usertype = data.usertype;
  if (data && data.username != null)
    oneUser.username = data.username;
  if (data && data.email != null)
    oneUser.email = data.email;
  if (data && data.fname != null)
    oneUser.fname = data.fname;
  if (data && data.lname != null)
    oneUser.lname = data.lname;
  if (data && data.mobile != null)
    oneUser.mobile = data.mobile;
  if (data && data.status != null)
    oneUser.status = data.status;
  if (data && data.created_by != null)
    oneUser.created_by = data.created_by;
  if (data && data.created_on != null)
    oneUser.created_on = data.created_on;
  
  return oneUser;
}

module.exports.get = get;
module.exports.getById = getById;
module.exports.save = save;
module.exports.getEntity = getEntity;