const express = require('express');
const { Study } = require('../models');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const Op = sequelize.Op;
/*
const multer = require('multer');
const upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } });
*/

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
            id,
            name,
            info,
            createdAt,
            updatedAt,
            //owner,
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
        res.render('group', {groups});
    } catch(error){
        console.error(err);
    }
});

router.get('/find', async(req, res, next) => { //유사검색 가능
    let searchStudy = req.params.searchStudy

    Study.findAll({
        where:{
            name: {
                [Op.like]: "%" + searchStudy + "%"
            }
        }
    })
        .then( result => {
            res.json(result)
        })
        .catch( err => {
            console.log(err)
        })
});

/*
router.post('/join', isLoggedIn, async(req,res,next) => { //그룹 가입
    const {id, name, info} = req.body;
    const study = await Study.findOne({where : {id}});

});
*/

module.exports = router;