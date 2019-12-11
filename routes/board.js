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
        if(parentStudy.userId != req.user.id)
            return res.json({msg: '권한이 없습니다.' });
        
        const exBoard = await Board.findOne({
            where : {
                name : req.body.name
            }
        });

        if(exBoard){
            return res.json({
                msg : req.body.name + " already exist"
            });
        }
    
        const boards = await parentStudy.getBoards();
        const board = await Board.create({
            week : boards.length,
            deadline : req.body.deadline,
            name : req.body.name,
            info : req.body.info,
            studyId : req.body.studyId,
        });
        return res.json({
            msg : board.name + "created!"
        });
    }catch(err){
        console.error(err);
        next(err);
    }
});
// router.get('/:studyId', async (req, res, next) => {
//     try{
//         const boards = await Board.findAll({
//             where : {studyId : req.params.studyId}
//         });
//         if(boards > 0){
//             res.json(boards);
//         }
//     } catch(err){
//         console.error(err);
//         next(err);
//     }
// });

module.exports = router;