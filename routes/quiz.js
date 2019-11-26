const express = require('express');
const router = express.Router();
const {Quiz, Answer} = require('../models');
const { isLoggedIn } = require('./middlewares');

router.post('/create', isLoggedIn, async (req, res, next) => {
    const {content, url, ownerAnswerId, name} = req.body;
    try{
        const quiz = await Quiz.create({
            name,
            content,
            url,
            owner : req.user.id,
            ownerAnswerId,            
        });
        if(ownerAnswerId){
            const ownerAnswer = await Answer.findOne({
                where: {id : ownerAnswerId}
            });
            quiz.addAnswer(ownerAnswer);
        }
        const result = {
            res : "success",
            quizId : quiz.id
        }; // 전페이지로 리다이렉트 시키는걸로 바꾸기
        res.json(result);
    } catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;