module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user',{
        email: {
            type : DataTypes.STRING(40),
            allowNull : false,
            unique : true,
        },
        nick : {
            type : DataTypes.STRING(15),
            allowNull : false,
        },
        password : {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },{
        timestamps : true,
        paranoid : true,
    });
};