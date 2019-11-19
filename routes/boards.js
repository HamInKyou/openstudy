const express = require('express');
const {Study, User, Board} = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try{
        const parentStudy = await Study.findOne({
            where : {
                id : req.body.studyId
            }
        });
        if(parentStudy.owner != req.user.id)
            return res.send('권한이 없습니다.');

        const exBoard = await Board.findOne({
            where : {
                name : req.body.name,
                week : req.body.week,
            }
        });
        if(exBoard){
            return res.send(req.body.name + " already exist");
        }
        const board = await Board.create({
            week : req.body.week,
            deadline : req.body.deadline,
            name : req.body.name,
            studyId : req.body.studyId,
        });
        res.send("study : " + board.name + "created");
    }catch(err){
        console.error(err);
        next(err);
    }
});