const express = require('express');
const router = express.Router();
const {Quiz} = require('../models');
const { isLoggedIn } = require('./middlewares');

router.post('/create', isLoggedIn, async (req, res, next) => {
    const {content, url, ownerAnswerId, name} = req.body;
    try{
        const quiz = await Quiz.create({
            name,
            content,
            url,
            owner : req.user.id,
            ownerAnswerId            
        });
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