const express = require('express');
const { Calendar , User  } = require('../models');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const moment = require('moment');
const Op = sequelize.Op;

//isLoggedIn,
router.post('/plan', async (req,res,next) => { //calendar에 plan 생성
    const { title,datetime,datetime_end} = req.body;
    try{
        const array = ['Orange','Green','Blue','Yellow','Purple','Aqua'];
        const n =Math.floor((Math.random()*100)%array.length); //0~length-1까지의 값을 줌
        const createPlan = await Calendar.create({
            userId: req.user.id, //사용자의 고유 아이디 받아옴
            title,  //title
            datetime, //시작 날짜
            datetime_end, //종료 날짜
            color : array[n], //랜덤 칼라
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

router.get('/',  async(req, res, next) =>{ //등록된 일정 불러오기  현재 날짜와 비교후 맞는 월로 가게함
    try{  //req.user.id  거기에 있는 정보를 가져옴
        const now =moment();
        const month = now.month;
        const plans = await Calendar.findAll({
            where :{
                 userId : 1
        }
    });
        res.json(plans);
        return;
    } catch(err){
        console.error(err);
    }
});

router.get('/delete/:calendarId',async(req,res,next)=>{
    const calendarId = req.params.calendarId;
    try{
        //const deleteCalendar = await Calendar.findOne({id : req.body.id})
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

router.post('/modify/:calendarId',async(req,res,next)=>{
    const calendarId = req.params.calendarId;
    const { title,datetime,datetime_end } = req.body;
    try{
        //const exStudy = await Study.findOne({})
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