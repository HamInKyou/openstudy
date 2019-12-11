const express = require('express');
const router = express.Router();
const {Quiz, Answer} = require('../models');
const { isLoggedIn } = require('./middlewares');

//비동기로 사용
// 처음 문제 생성할 때 정답 등록하는 용도
router.post('/create' , isLoggedIn,  async (req, res, next) => {
    const {content, url} = req.body;
    try{
        const answer = await Answer.create({
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
router.post('/submit', isLoggedIn, async (req, res, next) => {
    const {content, url, quizId } = req.body;
    try{
        const answer = await Answer.create({
            content,
            url,
            userId : req.user.id,
            quizId,
        });
        const exQuiz = await Quiz.findOne({
            where: { id : quizId}});
        exQuiz.addAnswer(answer);

        const result = {
            res : "success",
            answerId : answer.id,
        };
        res.json(result);
    }catch(err){
        console.error(err);
        next(err);
    }
})
module.exports = router;