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
        },
        createdAt : {
            type : 'TIMESTAMP',
            allowNull : true,
        },
        updatedAt : {
            type : 'TIMESTAMP',
            allowNull : true,
        },
        deletedAt : {
            type : 'TIMESTAMP',
            allowNull : true,
        },
        owner : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            allowNull : false,
        },
    },{
        timestamps : true,
        paranoid : true,
    });
};
