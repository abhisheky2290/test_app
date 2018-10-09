const Express = require('express');
const router = Express.Router();
var Q = require('q');
var db = require('../../server');
const user = require('../model/user');
var _table = 'user';


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
	user.getById(req)
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
  console.log('req==>',req.body);
  user.save(req.body)
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

module.exports = router;