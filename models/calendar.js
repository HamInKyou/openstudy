module.exports = (sequelize, DataTypes) => {
    return sequelize.define('calendar',{
        //얘는 일정 식별 번호, 순서대로 저장하는 고유키
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true,
        },
        userId : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        title : {
            type : DataTypes.STRING(400),
             allowNull : false,
        },
        name : {
            type : DataTypes.STRING(400),
            allowNull : false,
        },
        url : {
            type : DataTypes.STRING(200),
            allowNull : true,
        },
        datetime : {
            type : 'TIMESTAMP',
            allowNull : true,
        },
        datetime_end : {
            type : 'TIMESTAMP',
            allowNull : true,
        },
        color:{
            type :  DataTypes.STRING(400),
            allowNull : true,
        },
        class : {
            type : DataTypes.STRING(40),
            allowNull : false,
        },
    },{
        timestamps : true,
        paranoid : true,
    });
};
