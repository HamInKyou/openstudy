const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//1.사용하기전에 모든테이블을 한번에 삭제
//2. npm start
//3. localhost:8001/makeDummyData

const {User,Post, Study, Quiz, Answer, Tag, Chatlog, Comment, Board} = require('../models');

router.get('/', async (req, res, next) => {
    
    await (async()=>{
        for(var i =1 ; i <= 40; i++){
            var pw = "user"+i;
            const hash = await bcrypt.hash(pw, 12);
            await User.create({
                email : "user"+i+"@os.com",
                nick : "user"+i,
                password : hash.toString(),
            });
        }
        console.log('user done');
    })();
    
    await( async ()=>{
    for(var i=1; i<=10; i++){
        var rand = Math.floor(Math.random() * 5) + 1;
        const study = await Study.create({
            name : "study" + i,
            info : "study info " + i,
            userId : rand,
            imgUrl : "/uploads/course-1.jpg",
        });
    }
    console.log('study done');
   })();
    
    //스터디당 10명씩 enroll
    await(async()=>{
        for(var i=1; i<=40; i++){
            const user = await User.findOne({where:{id:i}});
            const study = await Study.findOne({
                where: {id : parseInt(i/10 + 1)}
            });
            await user.addEnrolledStudy(study);
            await study.addMember(user);
        }
        console.log('enroll done');
    })();
    await (async()=>{
        for(var s=1; s<=10; s++){
            for(var i=1; i<=4; i++){
                await Board.create({
                    week : i,
                    name : "board" + i + "in study:"+s,
                    info : "board info " + i,
                    studyId : s,
                    deadline : "19-12-02"
                });
            }
        }
        console.log('board done');
    })(); 
    await (async()=>{
        for(var b=1; b<=40; b++){
            for(var i=1; i<=4; i++){
                var rand = Math.floor(Math.random() * 5) + 1;
                await Post.create({
                    title : "post" + i + "in board:"+b,
                    content : "post content:" + i ,
                    info : "post content " + i ,
                    boardId : b,
                    url : "/uploads/course-1.jpg",
                    userId : rand
                });
            }
        }
        console.log('post done');
    })();
    await (async()=>{
        for(var p=1; p<=160; p++){
            for(var i=1; i<=4; i++){
                await Comment.create({
                    content : "comment content in post:" + p ,
                    url : "/uploads/course-1.jpg",
                    postId : p,
                    userId : p%4+1,
                    nick : "user" + (p%4+1) 
                });
            }
        }
        console.log('comment done');
    })(); 
    await (async()=>{
        for(var b=1; b<=40; b++){
            for(var i=1; i<=4; i++){
                await Quiz.create({
                    name : "quiz" + i + "in board:"+b,
                    content : "quiz content " + i ,
                    ownerAnswerId : null,
                    url : "/uploads/course-1.jpg",
                    boardId : b,
                    userId : b%4+1
                });
            }
        }
        console.log('quiz done');
    })();
    await (async()=>{
        for(var q=1; q<=160; q++){
            for(var i=1; i<=4; i++){
                await Answer.create({
                    name : "answer" + i + "in quiz:"+q,
                    content : "answer content " + i ,
                    url : "/uploads/course-1.jpg",
                    quizId : q,
                    userId : q%4+1
                });
            }
        }
        console.log('answer done');
    })();
    res.json({msg:'done'});
});

module.exports = router;