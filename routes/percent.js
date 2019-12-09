var express = require('express');
var router = express.Router();
const {Study,Submit,Board,Post} = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');


router.get('/my-study-percent/:studyId', async (req, res, next) => {
  try {
      const studyIdParam = req.params.studyId;
      const myStudy = await Study.findOne({ 
          where: {id: studyIdParam}
      });
     const studyMembers = await myStudy.getMember(); 
     const boards = await Board.findAll({
         where: {studyId: studyIdParam }
     });
     const Submits =await Submit.findAll({});
    
     const resultStudy = JSON.stringify(myStudy);
     const resultMembers = JSON.stringify(studyMembers);
     const resultBoards = JSON.stringify(boards);
    const resultSubmits = JSON.stringify(Submits);
    const resultUserId = JSON.stringify(req.user.id);
    res.render('my-study-percent', {
     myStudy : resultStudy,
     members : resultMembers,
     boards : resultBoards,
     Submits : resultSubmits,
     myUserId : resultUserId,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

  // router.get('/percent/:quizId', async (req, res, next) => {
  //   try {
  //       const quizId = req.params.quizId;
  //       const myQuiz = await Quiz.findOne({ //통계알고싶은 QUiz
  //           where: {id: quizId}
  //       });
  //      const studyMembers = myStudy.getMember({ raw : true}); //스터디의 인원 알기위해
  //      const boards = await Board.findAll({ //그 스터디의 게시판
  //          where: {studyId: studyId }
  //      });
  //      const mySubmits = Submit.findAll({ //자기의 제출-> 프론트에서 여기서 boarId일치하는거 뽑아야함
  //          where: {userId: req.user.id}
  //      });
  //      const posts = Post.findAll({ 
  //           where: {studyId: studyId}
  //      });

  //      const resultMembers = JSON.stringify(studyMembers);
  //      const resultBoards = JSON.stringify(boards);
  //     const resultSubmits = JSON.stringify(mySubmits);
  //     const resultPosts = JSON.stringify(posts);
  //     res.render('/percent', {
  //      members : resultMembers,
  //      boards : resultBoards,
  //      mySubmits : resultSubmits,
  //      posts : resultPosts
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     next(err);
  //   }
  // });


module.exports = router;
  