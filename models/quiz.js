module.exports = (sequelize, DataTypes) => {
    return sequelize.define('quiz',{
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true,
        },
        name : {
            type : DataTypes.STRING(100),
            allowNull : false,
        },
        content : {
            type : DataTypes.STRING(500),
            allowNull : true,
        },
        url : {
            type : DataTypes.STRING(200),
            allowNull : true,
        },
        ownerAnswerId : {
            type : DataTypes.INTEGER,
            allowNull : true,
            //답이 없는 문제일 수 도 있다.
        },
    },{
        timestamps : true,
    });
};
