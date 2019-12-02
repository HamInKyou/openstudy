module.exports = (sequelize, DataTypes) => {
    return sequelize.define('tag',{
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true,
        },
        line : {
            type :DataTypes.INTEGER,
            allowNull : false,
        },
        name : {
            type : DataTypes.STRING(100),
            allowNull : false,
        }
        //postId
        //userId in EnorllTag table because N:M
    },{
        timestamps : true,
        paranoid : true,
    });
};
