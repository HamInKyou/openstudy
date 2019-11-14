module.exports = (sequelize, DataTypes) => {
    return sequelize.define('study',{
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true,
        },
        name : {
            type : DataTypes.STRING(20),
            allowNull : false,
        },
        info : {
            type : DataTypes.STRING(100),
            allowNull : true,
        }
    },{
        timestamps : true,
        paranoid : true,
    });
};
