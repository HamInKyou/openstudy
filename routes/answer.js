const express = require('express');
const router = express.Router();
const {Quiz, Answer} = require('../models');
const { isLoggedIn } = require('./middlewares');

//비동기로 사용
// 처음 문제 생성할 때 정답 등록하는 용도
router.post('/create' , isLoggedIn,  async (req, res, next) => {
    const {name, content, url} = req.body;
    try{
        const answer = await Answer.create({
            name,
            content,
            url,
            userId : req.user.id,
        });
        const result = {
            res : "success",
            answerId : answer.id,
        };
        res.json(result);
    } catch(err){
        console.error(err);
        next(err);
    }
});
//이미 존재하는 퀴즈에 정답 제출하는 용도
router.post('/submit/:quizId', isLoggedIn, async (req, res, next) => {
    const {name, content, url} = req.body;
    try{
        const answer = await Answer.create({
            name,
            content,
            url,
            owner : req.user.id,
        });
        const exQuiz = await Quiz.findOne({where:{id:req.params.quizId}});
        exQuiz.addAnswer(answer);

        //나중에 퀴즈화면이나 퀴즈 목록화면으로 리다이렉트 
        res.send("submitted");
    }catch(err){
        console.error(err);
        next(err);
    }
})
module.exports = router;