module.exports = (sequelize, DataTypes) => {
    return sequelize.define('calendar',{
        //얘는 일정 식별 번호, 순서대로 저장하는 고유키
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true,
        },
        title : {
            type : DataTypes.STRING(400),
             allowNull : false,
        },
        start : {
            type : DataTypes.STRING(100),
            allowNull : true,
        },
        end : {
            type : DataTypes.STRING(100),
            allowNull : true,
        },
        color:{
            type :  DataTypes.STRING(400),
            allowNull : true,
        },
        //userId
    },{
        timestamps : true,
        paranoid : true,
    });
};