/*client의 request url과 route가 일치될 경우 실행됨*/
const express = require('express');
const { Calendar } = require('../models');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const calendar = require('node-calender');

router.post('/plan', isLoggedIn, async (req,res,next) => { //calendar에 plan 생성
    const {id,name,url,datetime,datetime_end,class } = req.body; 
    try{

        await Calendar.create({
            datetime,
            datetime_end,
            class
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
router.post('/show', async(req, res, next) =>{ //등록된 일정 불러오기
    try{
        const plans = await Calender.findAll();
        res.json({plans});
    } catch(error){
        console.error(err);
    }
});

// app.post('/init', async (req,res,next) => {
//     db.event.insert({ 
//         class:"One", 
//         datetime: new Date(2019,11,14),
//         datetime_end:  new Date(2019,11,15)
//     });   
//     res.send("Test events were added to the database")
// });
// app.post('/data', async (req,res,next) => {
//     db.event.find().toArray(function(err, data){
//         for (var i = 0; i < data.length; i++)
//             data[i].id = data[i]._id;
//         res.send(data);
//     });
// });
module.exports = router;