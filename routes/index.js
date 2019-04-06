const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/show', function(req, res, next) {
  models.Post.findAll().then(result => {
    res.render('show', {
      posts: result
    });
  })
});

router.post('/create', function(req, res, next) {
  let body = req.body;

  models.Post.create({
    title: body.inputTitle,
    writer: body.inputWriter,
    contents: body.inputContents
  })
  .then(result => {
    console.log("게시물이 성공적으로 작성되었습니다.");
    res.redirect('/show');
  })
  .catch(err => {
    console.log("게시물을 작성이 실패하였습니다.");
  })
});

module.exports = router;
