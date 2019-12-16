const express = require('express');
const router = express.Router();
const {Quiz, Answer} = require('../models');
const { isLoggedIn } = require('./middlewares');

router.post('/create', isLoggedIn, async (req, res, next) => {
    const {content, url, ownerAnswerId, name, boardId } = req.body;
    try{
        const quiz = await Quiz.create({
            name,
            content,
            url,
            userId : req.user.id,
            ownerAnswerId,
            boardId,             
        });
        if(ownerAnswerId != 0){
            const ownerAnswer = await Answer.findOne({
                where: {id : ownerAnswerId}
            });
            quiz.addAnswer(ownerAnswer);
        } else {
            
        }
        const result = {
            msg : "퀴즈가 등록 돼었습니다.",
            quizId : quiz.id
        };
        return res.json(result);
    } catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;