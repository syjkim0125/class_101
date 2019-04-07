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

router.post('/createPost/:user_id', function(req, res, next) {
  let userID = req.params.user_id;
  let body = req.body;
  let writer = models.User.findOne({
    where: {
      id: userID
    },
    attributes: ['user_name']
  })
  .then(writer => {
    models.Post.create({
    title: body.title,
    writer: writer.dataValues.user_name,
    contents: body.contents,
    user_id: userID
  })
  .then(result => {
    console.log("게시물이 성공적으로 작성되었습니다.");
  })
  .catch(err => {
    console.log("게시물 작성이 실패하였습니다.");
  })
})});

router.get('/userPosts/:user_id', function(req, res, next) {
  let userID = req.params.user_id;
  models.User.findAll({
    include: [{
      model: models.Post,
      where: {user_id: userID}
    }]
  })
  .then(result => {
    res.status(200).json({status: true, result: result});
  })
});

router.put('/updatePost/:post_id', function(req, res, next) {
  let postID = req.params.post_id;
  let body = req.body;

  models.Post.update({
    title: body.title,
    contents: body.contents
  },{
    where: {id: postID}
    })
    .then(result => {
      console.log("게시글이 수정되었습니다.");
    })
    .catch(err => {
      console.log("게시글 수정이 실패하였습니다.");
    });
});

router.delete('/deletePost/:post_id', function(req, res, next) {
  let postID = req.params.post_id;

  models.Post.destroy({
    where: {id: postID}
    })
    .then(result => {
      console.log("게시글 삭제를 성공하였습니다.");
    })
    .catch(err => {
      console.log("게시글 삭제를 실패했습니다.");
    });
});

router.post('/createComment/userId/:user_id/postId/:post_id', function(req, res, next) {
  let userID = req.params.user_id;
  let postID = req.params.post_id;
  let body = req.body;
  let writer = models.User.findOne({
    where: {
      id: userID
    },
    attributes: ['user_name']
  })
  .then(writer => {
    models.Comment.create({
      user_id: userID,
      post_id: postID,
      writer: writer.dataValues.user_name,
      contents: body.contents
    })
    .then(result => {
      console.log("댓글 작성을 완료했습니다.");
    })
    .catch(err => {
      console.log("댓글 작성을 실패했습니다.");
    })
  })
});

router.get('/userComments/:user_id', function(req, res, next) {
  let userID = req.params.user_id;
  models.User.findAll({
    include: [{
      model: models.Comment,
      where: {user_id: userID}
    }]
  })
  .then(result => {
    res.status(200).json({status: true, result: result});
  })
});

router.get('/postComments/:post_id', function(req, res, next) {
  let postID = req.params.post_id;
  models.Post.findAll({
    include: [{
      model: models.Comment,
      where: {post_id: postID}
    }]
  })
  .then(result => {
    res.status(200).json({status: true, result: result});
  })
});

router.put('/updateComment/:comment_id', function(req, res, next) {
  let commentID = req.params.comment_id;
  let body = req.body;

  models.Comment.update({
    contents: body.contents
  },{
    where: {id: commentID}
    })
    .then(result => {
      console.log("댓글이 수정되었습니다.");
    })
    .catch(err => {
      console.log("댓글 수정이 실패하였습니다.");
    });
});

router.delete('/deleteComment/:comment_id', function(req, res, next) {
  let commentID = req.params.comment_id;

  models.Comment.destroy({
    where: {id: commentID}
    })
    .then(result => {
      console.log("댓글 삭제를 성공하였습니다.");
    })
    .catch(err => {
      console.log("댓글 삭제를 실패했습니다.");
    });
});

module.exports = router;
