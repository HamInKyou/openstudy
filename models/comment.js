module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comment',{
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true,
        },
        content : {
            type : DataTypes.STRING(50),
            allowNull : true,
        },
    },{
        timestamps : true,
        paranoid : true,
    });
};
