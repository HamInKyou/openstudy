module.exports = (sequelize, DataTypes) => {
    return sequelize.define('post',{
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true,
        },
        title : {
            type : DataTypes.STRING(200),
            allowNull : false,
        },
        content : {
            type : DataTypes.STRING(500),
            allowNull : false,
        },
        url : {
            type : DataTypes.STRING(200),
            allowNull : true,
        },
    },{
        timestamps : true,
        paranoid : true,
    });
};
