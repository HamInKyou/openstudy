module.exports = (sequelize, DataTypes) => {
    return sequelize.define('answer',{
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true,
        },
        content : {
            type : DataTypes.STRING(500),
            allowNull : true,
        },
        url : {
            type : DataTypes.STRING(200),
            allowNull : false,
        },
        //quizid allowNull true
        //userid
    },{
        timestamps : true,
        paranoid : true,
    });
};
