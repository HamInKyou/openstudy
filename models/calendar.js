module.exports = (sequelize, DataTypes) => {
    return sequelize.define('post',{
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true,
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
        class : {
            type : DataTypes.STRING(40),
            allowNull : false,
        },
    },{
        timestamps : true,
        paranoid : true,
    });
};
