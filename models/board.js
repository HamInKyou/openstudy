module.exports = (sequelize, DataTypes) => {
    return sequelize.define('board',{
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true,
        },
        week : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        deadline : {
            type : DataTypes.STRING(100),
            allowNull : false,
        },
        name : {
            type : DataTypes.STRING(100),
            allowNull : false,
        },
        info : {
            type : DataTypes.STRING(200),
            allowNull : false,
        },
        //studyid
    },{
        timestamps : true,
        paranoid : true,
    });
};
