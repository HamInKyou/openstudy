const express = require('express');
const passport = require('passport');
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const {email, nick, password} = req.body;
   
    try{
        const exUser = await User.findOne({where : {email}});
        if(exUser){
            req.flash('msg','이미 가입된 메일' );
            return res.redirect('/');
        }
        const hash = await bcrypt.hash(password,12);
        await User.create({
            email,
            nick,
            password : hash,
        });
        req.flash('msg','회원가입 성공');
        return res.redirect('/register');
        
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/login', isNotLoggedIn,  (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if(authError){
            console.error(authError);
            next(authError);
        }
        if(!user){
            req.flash('msg' , info.message);
            return res.redirect('/');
           
        }
        return req.login(user, (logginError) => {
            if (logginError){
                console.error(logginError);
                next(logginError);
            }
            
            return res.redirect('../home');
            //안되면 지울것
        });
    })(req, res, next) ; //미들웨어 안의 미들웨어에 붙혀줌 authenticate
});

router.post('/logout', isLoggedIn, (req, res, next)=> {
    req.logout();
    req.session.destroy();
    return res.json( { status : 'logged out'});
})
module.exports = router;