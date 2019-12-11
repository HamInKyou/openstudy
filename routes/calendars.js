const express = require('express');
const { Calendar , User  } = require('../models');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const moment = require('moment');
const Op = sequelize.Op;

router.post('/plan',isLoggedIn, async (req,res,next) => { //calendar에 plan 생성
    const { title,start,end} = req.body;
    try{
        const colors = ['orange','green','blue','yellow','purple','aqua'];
        const n =Math.floor((Math.random()*100)%colors.length); //0~length-1까지의 값을 줌
        const createPlan = await Calendar.create({
            userId: req.user.id, //사용자의 고유 아이디 받아옴
            title,  //title
            start, //시작 날짜
            end, //종료 날짜
            color : colors[n], //랜덤 칼라
        });
        return res.json({
            res : true,
            msg : '캘린더 생성 완료'
        });
        
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/delete/:calendarId',isLoggedIn,async(req,res,next)=>{
    const calendarId = req.params.calendarId;
    try{
        const exCalendar = Calendar.findOne({
            where : {id : calendarId}
        });
        Calendar.destroy({
            where: { id: calendarId }
        });
        return res.json({
            res : true,
            msg : '캘린더 삭제 완료'
        });
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/modify/:calendarId',isLoggedIn,async(req,res,next)=>{
    const calendarId = req.params.calendarId;
    const { title,datetime,datetime_end } = req.body;
    try{
        const exCalendar = await Calendar.findOne({where: {id: calendarId}});
     
        Calendar.update({
            title : title,
            datetime : datetime,
            datetime_end : datetime_end
        },{
            where : {id: calendarId}
        });
        
        const updatedCalendar =Calendar.findOne({
            where : {id: calendarId}
        });
        res.json(updatedCalendar);
    }catch(err){
        console.error(err);
        next(err);
    }
});


module.exports = router;