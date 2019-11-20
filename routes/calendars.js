const express = require('express');
const { Calendar , User  } = require('../models');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const moment = require('moment');
const Op = sequelize.Op;


router.post('/plan', isLoggedIn, async (req,res,next) => { //calendar에 plan 생성
    const { title,datetime,datetime_end} = req.body;
    try{
        const array = ['Orange','Green','Blue','Yellow','Purple','Aqua'];
        const n =Math.floor((Math.random()*100)%array.length); //0~length-1까지의 값을 줌
        const createPlan = await Calendar.create({
            userId: req.user.id, //사용자의 고유 아이디 받아옴
            title,  //title
            datetime, //시작 날짜
            datetime_end, //종료 날짜
            color : array[n] //랜덤 칼라
        });
        
        return res.json({
            res : true,
            msg : '일정 생성 완료'
        });

    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/', isLoggedIn, async(req, res, next) =>{ //등록된 일정 불러오기  현재 날짜와 비교후 맞는 월로 가게함
    const now = moment().format('YYYYMMDD');
    const month = now.format('MM');
    try{  //req.user.id  거기에 있는 정보를 가져옴
        const plans = await Calender.findAll({where : {userId : req.user.id}});
        res.month;
        res.json(plans);
        return;
    } catch(error){
        console.error(err);
    }
});

// router.post('/delete',async(req,res,next)=>{
//     const {id} = req.body;
//     try{
//         const exStudy = await Study.findOne({})

//     }catch(err){
//         console.error(err);
//         next(err);
//     }
// });


// router.post('/create', isLoggedIn, async (req,res,next) => { //그룹 생성
//     const { name, info } = req.body;
//     try{
//         const exStudy = await Study.findOne({where : {name}});
//         const result = {};
//         if(exStudy){
//             return res.json({
//                 res : false,
//                 msg : '이미 있는 그룹'
//             });
//         }
//         const createdStudy = await Study.create({
//             name,
//             info,
//             owner : req.user.id
//         });
//         const exUser = await User.findOne({
//             where:{id : req.user.id}
//         });
//         await createdStudy.addMember(exUser);

//         return res.json({
//             res : true,
//             msg : '그룹 생성 완료'
//         });
//     } catch (err) {
//         console.error(err);
//         next(err);
//     }
// });

// router.get('/', async(req, res, next) =>{ //등록된 그룹 불러오기
//     try{
//         const groups = await Study.findAll();
//         res.json(groups);
//         return;
//     } catch(error){
//         console.error(err);
//     }
// });

// router.get('/search/:studyName', async(req, res, next) => { //그룹 이름으로 검색
//     const studyName = req.params.studyName;
//     if(!studyName){
//         res.json("Not Found");
//         return;
//     }
//     try{
//         const result = await Study.findAll({
//             where:{
//                 name:studyName
//             }
//         });
//         if(result){
//             res.json(result);
//             return;
//         }
//     } catch (error){
//             console.error(err);
//     }
// });

