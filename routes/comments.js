const express = require('express');
const { Comment , User ,Post } = require('../models');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const Op = sequelize.Op;

//isLoggedIn,
router.get('/',isLoggedIn, async (req,res,next) => { //comment 보여주기
    //postId 일단 빼고
    try{
        // if(req.params.postId){
            const comment = await Comment.findAll({
                // where : {postId : req.params.postId }
            });
            res.json(comment);
            return;
        // }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/create',isLoggedIn, async (req,res,next) => { //comment 생성
    //postId 일단 빼고
    const { content } = req.body;
    try{
        if(!content){ //content가 null여면 true
        return;
        }
        else{
                const newComment = await Comment.create({
                    content : content,  
                    //postId : req.params.postId, //댓글 게시글에따라 보여줌
                    nick : "hi"
            });
        }
        return res.json({
            res : true,
            msg : '댓글 생성 완료'
        });
    
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/delete/:commentId',isLoggedIn,async(req,res,next)=>{
    const commentId = req.params.commentId;
    try{
        Comment.destroy({
            where: { id: commentId }
        });
        return res.json({
            res : true,
            msg : '댓글 삭제 완료'
        });
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/modify/:commentId',isLoggedIn,async(req,res,next)=>{
    const commentId = req.params.commentId;
    const { content } = req.body;
    try{
        Comment.update({
            content : content,
        },{
            where : {id: commentId}
        });
        return res.json({
            res : true,
            msg : '댓글 수정 완료'
        });
    }catch(err){
        console.error(err);
        next(err);
    }
});


module.exports = router;
