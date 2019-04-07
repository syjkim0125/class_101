const express = require('express');
const models = require('../models');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.findAll()
  .then(result => {
    res.status(200).json({status: true, result: result});
    console.log("유저들을 불러오는 데에 성공했습니다.");
  })
  .catch(err => {
    console.log(body);
    console.log("유저들을 불러오는 데에 실패했습니다.");
  })
});

router.post('/createUser', function(req, res, next) {
  let body = req.body;

  models.User.create({
    name: body.name
  })
  .then(result => {
    res.status(200).json({status: true, result: result});
    console.log("유저가 성공적으로 가입되었습니다.");
  })
  .catch(err => {
    console.log(body);
    console.log("유저 가입이 실패하였습니다.");
  })
});

router.get('/:user_id', function(req, res, next) {
  let userID = req.params.user_id;
  models.User.findAll({where: {id: userID}})
  .then(result => {
    res.status(200).json({status: true, result: result});
    console.log("유저를 불러오는 데에 성공하였습니다.");
  })
  .catch(err => {
    console.log(body);
    console.log("유저를 불러오는 데에 실패하였습니다.");
  })
});

module.exports = router;
