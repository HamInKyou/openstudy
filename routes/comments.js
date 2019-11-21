const express = require('express');
const { Comment , User  } = require('../models');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const moment = require('moment');
const Op = sequelize.Op;


router.post('/:postId',isLoggedIn, async (req,res,next) => { //comment 보여주고 생성
    //postId 일단 빼고
    const { content } = req.body;
    try{
        if(!content){
            const newComment = await Comment.create({
                content,  
                postId : req.params.postId, //댓글 게시글에따라 보여줌
                userId : req.user.id,
            });
            const comments = await Comment.findAll();
            //완성 후 조건주기{where : {postId : postId}}
            res.json(comments);
        }
            const comments = await Comment.findAll();
            //완성 후 조건주기{where : {postId : postId}}
            res.json(comments);
 
    return;
    } catch (err) {
        console.error(err);
        next(err);
    }
});


module.exports = router;