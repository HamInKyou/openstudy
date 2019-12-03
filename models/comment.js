module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comment',{
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true,
        },
        content : {
            type : DataTypes.STRING(100),
            allowNull : false,
        },
        nick :{
            type : DataTypes.STRING(100),
            allowNull : false,
        },
        //userId
        //postId
    },{
        timestamps : true,
        paranoid : true,
    });
};
