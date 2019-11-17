const express = require('express');
const { Post, Board, Submit } = require('../models');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const moment = require('moment');

router.post('/create/:boardID', async (req,res,next) => { //게시글 생성
    const boardID = req.params.boardID;
    try{
        const deadline = moment(await Board.findOne({attributes: ['deadline']}, {where : {id : boardID}})).format();
        if(moment(deadline).diff(moment().format()) < 0){
            
            const post = await Post.create({
                content : req.body.content,
                url : req.body.url //img 파일 경로
            });
    
            const submit = await Submit.create({
                userId : req.user.id,
                boardId : boardID
            });

            // res.json(post);
            // res.json(submit);
            res.json({
                req : true,
                msg : '게시글 등록 완료'
            });

        } else {
            return res.json({req : false, msg : '기간이 지났습니다'});
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/:url', async (req, res, next) => { //게시글 가져오기
    const url = req.params.url;
    try{
        const posts = await Post.findOne({attributes: ['content']}, {where : {url : url}});
        res.json(posts);
    } catch(error){
        console.error(err);
    }
});

/*
router.get('/edit/:content/:studyId', isLoggedIn, async (req, res, next) => { //게시글 수정
    try{
        const exUser = await User.findOne({
            where : {id: req.params.studyId}
        });
        const exContent = await Post.findAll({
            where : {content: req.params.content}
        });
        //수정 코드
    } catch (error){
        console.error(err);
    }
});
*/

module.exports = router;