module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comment',{
        id : {  //고유 id
            type : DataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true,
        },
        content : { //내용
            type : DataTypes.STRING(50),
            allowNull : false,
        },
        nick : {
            type : DataTypes.STRING(15),
            allowNull : false,
        }
    },{
        timestamps : true,
        paranoid : true,
    });
};
