module.exports = (sequelize, DataTypes) => {
    return sequelize.define('submit',{
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true,
        },
       //userId
       //boardId
       //postId 
       //studyId
    },{
        timestamps : true,
        paranoid : true,
    });
};
