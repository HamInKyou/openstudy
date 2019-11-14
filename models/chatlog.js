module.exports = (sequelize, DataTypes) => {
    return sequelize.define('chatlog',{
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true,
        },
        userId : {
            type : DataTypes.STRING(50),
            allowNull : false,
        },
        content : {
            type : DataTypes.STRING(200),
            allowNull : false,
        },
    },{
        timestamps : true,
        paranoid : true,
    });
};
