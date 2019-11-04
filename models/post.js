module.exports = (sequelize, DataTypes) => {
    return sequelize.define('post',{
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
    },{
        timestamps : true,
        paranoid : true,
    });
};
