const express = require('express');
const { Post, Board, Submit } = require('../models');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const moment = require('moment');

router.post('/create', isLoggedIn, async (req,res,next) => { //게시글 생성
    try{
        const {title, content, url, boardId} = req.body;
        const find = await Board.findOne({where : {id : boardId}});
        const post = await Post.create({
            title,
            content,
            url, //img 파일 경로
            userId : req.user.id,
            boardId,
        });
        //임시로 채팅방 사용하기
        /*
        const exUser = await User.findOne({where : { id : req.user.id}});
        const createdTag = await Tag.create({
            name,
            postId : post.id,
            userId : req.user.id
        });
        createdTag.addMember(exUser);
        */
        if(moment(find.deadline).diff(moment().format()) > 0){   
            await Submit.create({
                userId : req.user.id,
                boardId,
                postId : post.id,
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

router.put('/update/:boardId/:postId', isLoggedIn, async (req, res, next) => { //게시글 수정
    const postId = req.params.postId;
    const boardId = req.params.boardId;
    try{
        const deadline = moment(await Board.findOne({attributes: ['deadline']}, {where : {id : boardId}})).format();
        if(moment(deadline).diff(moment().format()) < 0){
            if(!req.user.id.equals(post.userId)) return res.json({req : false, msg : '작성자가 일치하지 않습니다.'});  
            const update = await Post.update({
                content : req.body.content,
                url : req.body.url
            }, {where : {id : postId}});
        res.json({req : true, msg : '데이터 수정 완료'})
        }
    } catch (error){
        console.error(err);
    }
});

router.delete('/delete/:postId', isLoggedIn, async(req, res, next) => {
    const postId = req.params.postId;
    try{
        await Post.destroy({
            where : {id : postId}
        });
        res.json({req : true, msg : '데이터 삭제 완료'});
    } catch (error){
        console.error(err);
    }
});

module.exports = router;