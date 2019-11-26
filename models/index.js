const Sequelize = require('sequelize');
const env = process.env.NODE_ENV;
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize,Sequelize);
db.Study = require('./study')(sequelize,Sequelize);
db.Board = require('./board')(sequelize,Sequelize);
db.Post = require('./post')(sequelize,Sequelize);
db.Comment = require('./comment')(sequelize,Sequelize);
db.Tag = require('./tag')(sequelize,Sequelize);
db.Submit = require('./submit')(sequelize,Sequelize);
db.Chatlog = require('./chatlog')(sequelize,Sequelize);
db.Calendar = require('./calendar')(sequelize, Sequelize);
db.Quiz = require('./quiz')(sequelize, Sequelize);
db.Answer = require('./answer')(sequelize, Sequelize);

//user post
db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);
//user comment
db.User.hasMany(db.Comment);
db.Comment.belongsTo(db.User);
//user study
db.User.belongsToMany(db.Study,{
    as : 'EnrolledStudy',
    foreignKey : 'userId',
    through : 'Enroll',
});
db.Study.belongsToMany(db.User,{
    as : 'Member',
    foreignKey : 'studyId',
    through : 'Enroll',
});
//study board
db.Study.hasMany(db.Board);
db.Board.belongsTo(db.Study);
//board post
db.Board.hasMany(db.Post);
db.Post.belongsTo(db.Board);
//post comment
db.Post.hasMany(db.Comment);
db.Comment.belongsTo(db.Post);
//submit board
db.Board.hasOne(db.Submit);
//post tag
db.Post.hasMany(db.Tag);
db.Tag.belongsTo(db.Post);
//tag chatlog
db.Tag.hasOne(db.Chatlog);
//user calendar
db.User.hasOne(db.Calendar);
//user tag
db.User.belongsToMany(db.Tag,{
    as : 'enrolledTag',
    foreignKey : 'userId',
    through : 'userTag',
});
db.Tag.belongsToMany(db.User,{
    as : 'Member',
    foreignKey : 'tagId',
    through : 'userTag',
});
//user(owner) study
db.User.hasMany(db.Study,{
    foreignKey: 'owner'
});
//quiz answer
db.Quiz.hasMany(db.Answer, {
    as : 'Answer',
});

module.exports = db;
