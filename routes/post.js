const express = require('express');
const models = require('../models');
const router = express.Router();

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
    res.status(200).json({status: true, result: result});
    console.log("게시물이 성공적으로 작성되었습니다.");
  })
  .catch(err => {
    console.log(body);
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
    console.log("게시물을 가져오는 데에 성공하였습니다.");
  })
  .catch(err => {
    console.log(body);
    console.log("게시물을 가져오는 데에 실패하였습니다.");
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
      res.status(200).json({status: true, result: result});
      console.log("게시글이 수정되었습니다.");
    })
    .catch(err => {
      console.log(body);
      console.log("게시글 수정이 실패하였습니다.");
    });
});

router.delete('/deletePost/:post_id', function(req, res, next) {
  let postID = req.params.post_id;

  models.Comment.destroy({ // 게시글이 삭제되면 댓글도 같이 삭제되어야 한다.
    where: {post_id: postID}
    })
  models.Post.destroy({
    where: {id: postID}
    })
    .then(result => {
      res.status(200).json({status: true, result: result});
      console.log("게시글 삭제를 성공하였습니다.");
    })
    .catch(err => {
      console.log(body);
      console.log("게시글 삭제를 실패했습니다.");
    });
});

module.exports = router;
