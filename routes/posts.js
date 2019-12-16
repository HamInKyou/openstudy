const express = require('express');
const { Post, Board, Submit, User , Tag} = require('../models');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const moment = require('moment');

router.post('/create', isLoggedIn, async (req,res,next) => { //게시글 생성
    try{
        const {title, content, url, boardId, studyId} = req.body;
        const find = await Board.findOne({where : {id : boardId}});
        const post = await Post.create({
            title,
            content,
            url, //img 파일 경로
            userId : req.user.id,
            boardId,
            studyId,
        });
        //임시로 채팅방 사용하기
        
        const exUser = await User.findOne({where : { id : req.user.id}});
        const createdTag = await Tag.create({
            name : title,
            postId : post.id,
            userId : req.user.id
        });
        createdTag.addMember(exUser);
        
        if(moment(find.deadline, "YYMMDD").diff(moment().format()) > 0){   
            await Submit.create({
                userId : req.user.id,
                boardId,
                postId : post.id,
                studyId,
            });
            return res.json({
                req : true,
                msg : '게시글 등록 완료 ( 기간 내에 제출 )'
            });

        } else {
            return res.json({req : false, msg : '게시글 등록완료 (기간초과)'});
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/get/:postId', async (req, res, next) => { //게시글 가져오기
    const postId = req.params.postId;
    if(!postId){
        res.json("Not Found");
        return;
    }
    const result = await Post.findAll({
        where:{
           id:postId
       }
    })
    .then( result => {
        res.json(result)
    })
    .catch( err => {
        console.log(err)
    });
});

module.exports = router;