const express = require('express');
const { Post, Board, Submit } = require('../models');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const moment = require('moment');

router.post('/create/:boardID', async (req,res,next) => { //게시글 생성
    const boardID = req.params.boardID;
    try{
        const find = await Board.findOne({attributes: ['deadline']}, {where : {id : boardID}});;
        if(moment(find.deadline).diff(moment().format()) > 0){
            const post = await Post.create({
                content : req.body.content,
                url : req.body.url //img 파일 경로
            });
    
            const submit = await Submit.create({
                userId : 1111,
                boardId : boardID
            });
            
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

router.get('/get/:postId', async (req, res, next) => { //게시글 가져오기
    const postId = req.params.postId;
    if(!postId){
        res.json("Not Found");
        return;
    }
    const result = await Post.findAll({
        attributes: ['id', 'content', 'createdAt', 'updatedAt'] //이거 없으면, 현재 userId, boardId를 database에 만들지 않아서 불가함. mysql database 수정 필요
    }, {
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
            // if(!req.user.id.equals(post.userId)) return res.json({req : false, msg : '작성자가 일치하지 않습니다.'});  
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