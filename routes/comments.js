const express = require('express');
const { Comment , User ,Post } = require('../models');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const moment = require('moment');
const Op = sequelize.Op;


router.post('/', isLoggedIn, async (req,res,next) => { //comment 보여주고 생성
    const { content } = req.body;
    try{
        const comments = await Comment.findAll({where : {postId : req.post.id}});
        res.json(comments);
        if(!content){
            const createPlan = await Calendar.create({
                userId: req.user.id, //사용자의 고유 아이디 받아옴,수정&삭제할때 사용
                content,  
                postId: await Post.findOne({where : {userId : req.user.id}}).id, //댓글 게시글에따라 보여줌
            });
            return res.json({
                res : true,
                msg : '댓글 생성 완료'
            });
        }
        return;
    } catch (err) {
        console.error(err);
        next(err);
    }
});


