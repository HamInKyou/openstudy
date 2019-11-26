const express = require('express');
const router = express.Router();
const {Quiz, Answer} = require('../models');
const { isLoggedIn } = require('./middlewares');

router.post('/create' , isLoggedIn,  async (req, res, next) => {
    //비동기로 사용
    const {name, content, url, quizId} = req.body;
    try{
        const answer = await Answer.create({
            name,
            content,
            url,
            quizId,
            owner : req.user.id,
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

module.exports = router;