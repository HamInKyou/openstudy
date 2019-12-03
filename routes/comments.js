const express = require('express');
const { Comment , User  } = require('../models');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');


router.post('/:postId',isLoggedIn, async (req,res,next) => { //comment 보여주고 생성
    const { content } = req.body;
    try{
        console.log(req.user.nick);
        const newComment = await Comment.create({
            content,  
            postId : req.params.postId, //댓글 게시글에따라 보여줌
            userId : req.user.id,
            nick : req.user.nick,
        });
        //나중에 게시글 화면으로 리다이렉트
        res.json(newComment);
 
    } catch (err) {
        console.error(err);
        next(err);
    }
});


module.exports = router;