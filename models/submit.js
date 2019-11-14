module.exports = (sequelize, DataTypes) => {
    return sequelize.define('submit',{
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true,
        },
       userId : {
           type : DataTypes.INTEGER,
           allowNull : false,
       },
       boardId : {
           type : DataTypes.INTEGER,
           allowNull : false,
       },
    },{
        timestamps : true,
        paranoid : true,
    });
};
