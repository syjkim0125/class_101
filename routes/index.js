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

router.get('/edit/:id', function(req, res, next) {
  let postID = req.params.id;

  models.Post.findOne({
    where: {
      id: postID
    }})
    .then(result => {
      res.render('edit', {
        post: result
      });
    })
    .catch(err => {
      console.log("게시글 조회가 안됩니다.");
    });
});

router.put('/update/:id', function(req, res, next) {
  let postID = req.params.id;
  let body = req.body;

  models.Post.update({
    title: body.editTitle,
    writer: body.editWriter,
    contents: body.editContents
  },{
    where: {
      id: postID
    }})
    .then(result => {
      console.log("게시글이 수정되었습니다.");
      res.redirect('/show');
    })
    .catch(err => {
      console.log("게시글 수정이 실패하였습니다.");
    });
});

router.delete('/delete/:id', function(req, res, next) {
  let postID = req.params.id;

  models.Post.destroy({
    where: {
      id: postID
    }})
    .then(result => {
      res.redirect('/show')
    })
    .catch(err => {
      console.log("게시글 삭제를 실패했습니다.");
    });
});

module.exports = router;
