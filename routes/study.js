const express = require('express');
const passport = require('passport');
const { Study } = require('../models');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.post('/create', isLoggedIn, async (req,res,next) => { //그룹 생성
    const {id, name, info} = req.body;
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
            id,
            name,
            info,
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