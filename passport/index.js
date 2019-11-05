const {User} = require('../models');
const local = require('./localStrategy');

module.exports = (passport) => {
    passport.serializeUser((user,done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findOne({
            where : {id},
            include: [{
                model: User,
                attributes: ['id', 'nick'],
                as : 'Followers',
            }, {
                model : User,
                attributes : ['id', 'nick'],
                as : 'Followings',
            }],
        })
        .then( user => done(null, user))
        .catch(err => done(err))
    });

    local(passport);
};