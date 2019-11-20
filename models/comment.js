module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comment',{
        id : {  //고유 id
            type : DataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true,
        },
        userId : { //사용자 id, nickname 등을 표시해주기 위해 필요
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        content : { //내용
            type : DataTypes.STRING(50),
            allowNull : true,
        },
        postId : { //댓글을 달은 게시글의 id,어느 게시글인지 확인
            type : DataTypes.INTEGER,
            allowNull : false,
        },
    },{
        timestamps : true,
        paranoid : true,
    });
};
