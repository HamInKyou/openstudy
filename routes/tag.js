const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('./middlewares');
const {Tag, User} = require('../models');
// tag는 chatting room 의 기능을 같이 한다.

router.post('/', isLoggedIn, async (req, res, next) => {
    const { name, postId } = req.body;
    try {
        const exUser = await User.findOne({where : {id : req.user.id}});
        //s나중에 name 중복 검사
        const createdTag = await Tag.create({
            name,
            postId,
            userId : req.user.id
        });
        createdTag.addMember(exUser);

        res.send("tag:" + req.body.name + " created In Post " + postId);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/enroll/:tagId', isLoggedIn, async (req, res, next) => {
    try{
        const exUser = await User.findOne({where : { id : req.user.id}});
        const exTag = await Tag.findOne({where : {id : req.params.tagId}});
        await exUser.addEnrolledTag(exTag);
        await exTag.addMember(exUser);

        res.send("user:" + req.user.id + "enroll to " + req.params.tagId);
    }catch(err){
        console.error(err);
        next(err);
    }
});
router.post('/leave/:tagId', isLoggedIn, async (req, res, next) => {
    try{
        const exUser = await User.findOne({where : { id : req.user.id}});
        const exTag = await Tag.findOne({where : {id : req.params.tagId}});
        await exUser.removeEnrolledTag(exTag);
        await exTag.removeMember(exUser);
       
        res.send('done');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;