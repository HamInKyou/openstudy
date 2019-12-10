const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Study, User } = require('../models');
const Op = sequelize.Op;

router.post('/create', isLoggedIn, async (req,res,next) => { //그룹 생성
    const { name, info, imgUrl } = req.body;
    try{
        const exStudy = await Study.findOne({where : {name}});
        if(exStudy){
            return res.json({
                res : false,
                msg : '이미 있는 그룹'
            });
        }
        const createdStudy = await Study.create({
            name,
            info,
            userId : req.user.id,
            imgUrl,
        });
        const exUser = await User.findOne({
            where:{id : req.user.id}
        });
        await createdStudy.addMember(exUser);
        return res.json({
            res : true,
            msg : '그룹 생성 성공'
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

router.post('/enroll/:studyId', async(req,res,next)=>{
    try{
        const exStudy = await Study.findOne({
            where: {id : req.params.studyId }
        });
        const exUser = await User.findOne({
            where : {id: req.user.id}
        });
        const enrolled = await exUser.getEnrolledStudy({raw:true});
        enrolled.some(element => {
            console.log(element);
            if(element.id == exStudy.id){
                return res.json({
                    msg : '이미 가입됐습니다.',
                    res : false, 
                });
            }
        });
        await exStudy.addMember(exUser);
        await exUser.addEnrolledStudy(exStudy);
        return res.json({
            msg : exStudy.id + '에 가입됐습니다.',
            res : true  
        });
    } catch(err){
        console.error(err);
        next(err);
    }
});
router.post('/leave/:studyId', async (req, res, next) => {
    try{
        const exStudy = await Study.findOne({
            where : {id : req.params.studyId}
        });
        const exUser = await User.findOne({
            where : {id : req.user.id}
        });
        await exStudy.removeMember(exUser);
        await exUser.removeEnrolledStudy(exStudy);
        res.send(exUser.id + ' leaved study:' + exStudy.id);
    }catch(err){
        console.error(err);
        next(err);
    }
});
router.get('/isEnrolled/:studyId', async(req, res,next)=>{
    const exStudy = await Study.findOne({
        where: {id : req.params.studyId }
    });
    const members = await exStudy.getMember({raw : true});
    members.some(element => {
        console.log(element);
        if(element.id == req.user.id){
            return res.json({
                msg : '이미 가입됐습니다.',
                res : true, 
            });
        }
    });
    return res.json({
        msg : '아직 가입하지 않았습니다.',
        res : false, 
    });    
});
module.exports = router;