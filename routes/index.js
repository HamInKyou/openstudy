var express = require('express');
var router = express.Router();
const {Post,User,Study,Board} = require('../models');


/* GET home page. */
router.get('/',  (req, res, next) => {
  res.render('login', {
    msg: req.flash('msg')
  });
});

router.get('/home', async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {id: req.user.id }
    });
    const enrolledStudies = await exUser.getEnrolledStudy({
      raw: true
    });
    const result = JSON.stringify(enrolledStudies);
    res.render('home', {
      myStudies: result
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/my-calendar', (req, res, next) => {
  res.render('my-calendar');
});

router.get('/my_test', (req, res, next) => {
  res.render('my_test');
});

router.get('/my-test-solve', (req, res, next) => {
  res.render('my-test-solve');
});

router.get('/my-test-post', (req, res, next) => {
  res.render('my-test-post');
});

router.get('/register', (req, res, next) => {
  res.render('register', {
    msg: req.flash('msg')
  });
});
router.get('/study-intro/:studyId', async (req, res, next) => {
  try {
    const studyId = req.params.studyId;
    const exStudy = await Study.findOne({
      where: {
        id: studyId
      }
    });
    const result = JSON.stringify(exStudy);

    res.render('study-intro', {
      studyInfo: result
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.get('/study-list', async (req, res, next) => {
  //mystudylist
  try {
    const exUser = await User.findOne({
      where: {
        id: req.user.id
      }
    });
    const enrolledStudies = await exUser.getEnrolledStudy({raw: true});
    const result = JSON.stringify(enrolledStudies);

    res.render('study-list', {
      myStudies: result
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.get('/study-post-list/:boardId', async (req, res, next) => {
  try {
    const exPosts = await Post.findAll({
      where: {
        boardId: req.params.boardId
      },
      include : {
          model : User,
          attributes : ['id', 'nick'],
          raw : true
      },
    });
    res.render('study-post-list', {
      posts: JSON.stringify(exPosts)
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.get('/study-post', (req, res, next) => {
  res.render('study-post');
});
router.get('/study-quiz-list', (req, res, next) => {
  res.render('study-quiz-list');
});
router.get('/study-week/:studyId', async (req, res, next) => {
  try {
    const exBoards = await Board.findAll({
      where: {
        id: req.params.studyId
      }
    });
    res.render('study-week', {
      boards: JSON.stringify(exBoards)
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.get('/quiz-post', (req, res, next) => {
  res.render('quiz-post');
});
// tag 선택 (채팅방 선택)
// router.get('/tags', async (req, res, next) => {
//   try{
//     const exUser = await User.findOne({where : { id : req.user.id}});
//     const tags = await exUser.getEnrolledTag({raw : true}); 

//     res.render('chat', { tags : JSON.stringify(tags) });
//   } catch(err) {
//     console.error(err);
//     next(err);
//   }
// });
router.get('/chat/:tagId', async (req, res, next) => {
  try{
    //const tag = await Tag.findOne({where : { id : req.params.tagId}});
   
    // const chatlogs = await Chatlog
    //const io = req.app.get('io');
    //채팅로그, 태그정보들 가져와서 넘겨주기 
   
    //chat.ejs에서 처음 클라에서 소켓 접속
    res.render('chat', {roomId : req.params.tagId});
  } catch(err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;