const express = require('express');
const { Post, Board } = require('../models');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const moment = require('moment');

router.post('/create/:boardID', async (req,res,next) => { //게시글 생성
    const boardID = req.params.boardID;
    try{
        const deadline = moment(await Board.findOne({attributes: ['deadline']}, {where : {boardID : boardID}})).format();
        if(moment(deadline).diff(moment().format()) < 0){
            const post = await Post.create({
                content : req.body.content,
                url : req.body.url
            });
            res.json(post);
        } else {
            return res.json({req : false, msg : '기간이 지났습니다'});
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/', isLoggedIn, async (req, res, next) => { //게시글 가져오기
    try{
        const posts = await Post.findAll();
        return res.json(posts);
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