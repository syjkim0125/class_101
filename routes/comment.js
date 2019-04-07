const express = require('express');
const models = require('../models');
const router = express.Router();

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
      res.status(200).json({status: true, result: result});
      console.log("댓글 작성을 완료했습니다.");
    })
    .catch(err => {
      console.log(body);
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
    console.log("유저의 모든 댓글 불러오기를 완료했습니다.");
  })
  .catch(err => {
    console.log(body);
    console.log("유저의 모든 댓글 불러오기를 실패했습니다.");
  })
});

router.get('/postComments/:post_id/:page', function(req, res, next) {
  let postID = req.params.post_id;
  let pageNum = req.params.page;
  let offset = 0;

  if (pageNum > 1) {
    offset = 5 * (pageNum - 1);
  }
  models.Post.findOne({
    include: [{
      model: models.Comment,
      where: {post_id: postID},
      offset: offset,
      limit: 5
    }]
  })
  .then(result => {
    res.status(200).json({status: true, result: result});
    console.log("게시글에 달린 댓글 불러오기를 성공했습니다.");
  })
  .catch(err => {
    console.log(body);
    console.log("게시글에 달린 댓글 불러오기를 실패했습니다.");
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
      res.status(200).json({status: true, result: result});
      console.log("댓글이 수정되었습니다.");
    })
    .catch(err => {
      console.log(body);
      console.log("댓글 수정이 실패하였습니다.");
    });
});

router.delete('/deleteComment/:comment_id', function(req, res, next) {
  let commentID = req.params.comment_id;

  models.Comment.destroy({
    where: {id: commentID}
    })
    .then(result => {
      res.status(200).json({status: true, result: result});
      console.log("댓글 삭제를 성공하였습니다.");
    })
    .catch(err => {
      console.log(body);
      console.log("댓글 삭제를 실패했습니다.");
    });
});

module.exports = router;
