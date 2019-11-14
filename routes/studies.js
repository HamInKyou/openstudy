const express = require('express');
const { Study } = require('../models');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const Op = sequelize.Op;

router.post('/create', isLoggedIn, async (req,res,next) => { //그룹 생성
    const {id, name, info, createdAt, updatedAt, deletedAt, owner} = req.body;
    try{
        const exStudy = await Study.findOne({where : {name}});
        const result = {};
        if(exStudy){
            return res.json({
                res : false,
                msg : '이미 있는 그룹'
            });
        }
        await Study.create({
            name,
            info
        });
        return res.json({
            res : true,
            msg : '그룹 생성 완료'
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/', async(req, res, next) =>{ //등록된 그룹 불러오기
    try{
        const groups = await Study.findAll();
        res.json(groups);
        return;
    } catch(error){
        console.error(err);
    }
});

router.get('/search/:studyName', async(req, res, next) => { //그룹 이름으로 검색
    const studyName = req.params.studyName;
    if(!studyName){
        res.json("Not Found");
        return;
    }
    try{
        const result = await Study.findAll({
            where:{
                name:studyName
            }
        });
        if(result){
            res.json(result);
            return;
        }
    } catch (error){
            console.error(err);
    }
});

module.exports = router;