module.exports = (sequelize, DataTypes) => {
    return sequelize.define('chatlog',{
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true,
        },
        nick : {
            type : DataTypes.STRING(100),
            allowNull : false,
        },
        content : {
            type : DataTypes.STRING(200),
            allowNull : false,
        },
        //userId
        //tagId
    },{
        timestamps : true,
        paranoid : true,
    });
};
