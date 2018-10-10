const Express = require('express');
const router = Express.Router();
var Q = require('q');
var db = require('../../server');
const user = require('../model/user');
var _table = 'user';
var _ = require('lodash');
var crypto = require('crypto');
const { body,validationResult } = require('express-validator/check');

router.get('/', (req, res, next) => {
  var data={};
	user.get()
	.then(function (result) {
		res.send(res.status(200).json({
        "message": "success",
        "result": result
      })
		)
    
  })
  .catch (function (err) {
    return res.status('400').send(err);
  });
});

router.get('/:id', (req, res, next) => {
  var user_id = req.params.id;
	user.getById({user_id:user_id})
	.then(function (result) {
		res.send(res.status(200).json({
        "message": "success",
        "result": result
      })
		)
  })
  .catch (function (err) {
    return res.status('400').send(err);
  });
});

router.post('/', (req, res, next) => {
  var default_user = {
    status: 1,
    created_on: new Date()
  };
  var entity = _.assign(default_user, user.getEntity(req.body)); //get filtered data
  entity.password = crypto.createHash('md5').update(req.body.password).digest("hex");
  user.save(entity)
  .then(function (result) {
    var inserted_id = (result && result[0] != null) ? result[0] : null;
    if (inserted_id != null) {
      res.send({
        'message': 'Record Saved Successfully',
        'inserted_id': inserted_id
      });
    } else {
      const err = Error();
      err.message = 'Error in save.';
      err.code = 400
      err.status = 'ISSUE_IN_SAVE';
      throw err;
    }
  })
  .catch (function (err) {
    if (err && err.status == 'AlreadyExists') {
      return res.status(err.code).send(err);
    } else {
      return res.status('400').send(err);
    }
  });
});

router.put('/:id', (req, res, next) => {
  if (req.params.id != null || req.params.id != "") {
    var where = {
      "user_id": req.params.id
    };
  }
  var default_user = {
    modified_on: new Date()
  };
  var entity = _.assign(default_user, user.getEntity(req.body)); //get filtered data
  user.save(entity,where)
  .then(function (result) {
    if (result) {
      res.send({
        'message': 'Record Saved Successfully'
        
      });
    } else {
      const err = Error();
      err.message = 'Error in save.';
      err.code = 400
      err.status = 'ISSUE_IN_SAVE';
      throw err;
    }
  })
  .catch (function (err) {
    if (err && err.status == 'AlreadyExists') {
      return res.status(err.code).send(err);
    } else {
      return res.status('400').send(err);
    }
  });
});

module.exports = router;