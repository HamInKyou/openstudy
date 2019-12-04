var express = require('express');
var router = express.Router();
const {Post, User, Study, Board, Quiz, Answer} = require('../models');


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

router.get('/my-test-post/:pageId', async(req, res, next) => {
  try{
    const pageId = req.params.pageId;
    const myQuiz = await Quiz.findAndCountAll({offset : (pageId-1) * 10, limit : 10, order : [sequelize.literal('id DESC')]}, {where:{userId:req.user.id}});
    res.render('my-test-post', { myQuiz : JSON.stringify(myQuiz), page : pageId });
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.get('/my-test-solve-particular/:answerId', async(req, res, next) => {
  try{
    const answerId = req.params.answerId;
    const answerPost = await Answer.findOne({where : {id : answerId}});
    const quizPost = await Quiz.findOne({where : {id : answerPost.quizId}
      , include : [{
      model : User,
      attributes : ['id', 'nick'],
      raw : true
    }, {
      model : Board,
      attributes : ['name'],
      raw : true
      }] 
    });
    const value = quizPost.ownerAnswerId;
    let quizAnswer;
    if(value == null){
      quizAnswer = 'No Answer';
    }else{
      quizAnswer = await Answer.findOne({where : {quizId : value}});
    }
    res.render('my-test-solve-particular', {myanswer : JSON.stringify(answerPost), quiz : JSON.stringify(quizPost), answer : JSON.stringify(quizAnswer)});
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.get('/my-test-solve/:pageId', async(req, res, next) => {
  try{
    const pageId = req.params.pageId;
    const exQuiz = await Answer.findAndCountAll({include : [{
      model : Quiz,
      raw : true, include : [{
        model : Board,
        attributes : ['name'],
        raw : true
      }]}, {
        model : User,
        attributes : ['id', 'nick'],
        raw : true
      }], where : {userId : req.user.id}, offset : (pageId-1) * 10, limit : 10, order : [sequelize.literal('id DESC')]
      }
    );
    res.render('my-test-solve', { quiz : JSON.stringify(exQuiz), page : pageId });
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.get('/my-test-post-particular/:quizId', async(req, res, next) => {
  try{
    const quizId = req.params.quizId;
    const quizPost = await Quiz.findOne({where : {id : quizId}, include : [{
      model : User,
      attributes : ['id', 'nick'],
      raw : true
    }, {
      model : Board,
      attributes : ['name'],
      raw : true
      }]});
    const value = quizPost.ownerAnswerId;
    let quizAnswer;
    if(value == null){
      quizAnswer = 'No Answer';
    }else{
      quizAnswer = await Answer.findOne({where : {quizId : value}});
    }
    const answerPost = await Answer.findAll({where : {quizId : quizId}, exclude: [{
      model : Quiz,
      attributes : ['id'],
      raw : true
    }]});
    res.render('my-test-post-particular', { quiz : JSON.stringify(quizPost), answer : JSON.stringify(answerPost), myAnswer : JSON.stringify(quizAnswer)});
  }catch(err){
    console.error(err);
    next(err);
  }
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
      include : {
        model : User,
        attributes : ['id', 'nick'],
        raw : true
      },
      where: {
        boardId: req.params.boardId
      }
    });
    res.render('study-post-list', {
      posts: JSON.stringify(exPosts)
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/study-post/:boardId', async(req, res, next) => {
  try{
    const exBoard = await Board.findOne({where : {id : req.params.boardId}});
    const exStudy = await Study.findOne({where : {id : exBoard.studyId}});
    res.render('study-post', { board : JSON.stringify(exBoard), study : JSON.stringify(exStudy) });
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.get('/study-quiz-list/:boardId/:pageId', async(req, res, next) => {
  try{
    const boardId = req.params.boardId;
    const pageId = req.params.pageId;
    const exBoard = await Board.findOne({where : {id : boardId}});
    const exStudy = await Study.findOne({where : {id : exBoard.studyId}});
    const exQuiz = await Quiz.findAll({offset : (pageId-1) * 10, limit : 10, order : [sequelize.literal('id DESC')], where : {boardId : boardId}, include : [{
      model : User,
      attributes : ['id', 'nick'],
      raw : true
    }]});
    res.render('study-quiz-list', {
      study : JSON.stringify(exStudy),
      board : JSON.stringify(exBoard),
      quiz : JSON.stringify(exQuiz),
      page : pageId,
    });
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.get('/study-quiz-solve/:quizId', async(req, res, next) => {
  try{
    const quizId = req.params.quizId;
    const exQuiz = await Quiz.findOne({where : {id : quizId}
      , include : [{
      model : User,
      attributes : ['id', 'nick'],
      raw : true
    }, {
      model : Board,
      attributes : ['name'],
      raw : true
      }] 
    });
    const exBoard = await Board.findOne({where : {id : exQuiz.boardId}});
    const exStudy = await Study.findOne({where : {id : exBoard.studyId}});
    res.render('study-quiz-solve', {
      study : JSON.stringify(exStudy),
      board : JSON.stringify(exBoard),
      quiz : JSON.stringify(exQuiz),
    });
  }catch(err){
    console.error(err);
    next(err);
  }
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

router.get('/quiz-post/:boardId', async(req,res,next) => {
  try{
    const exBoard = await Board.findOne({where : {id : req.params.boardId}});
    const exStudy = await Study.findOne({where : {id : exBoard.studyId}});
    res.render('quiz-post', { board : JSON.stringify(exBoard), study : JSON.stringify(exStudy) });
  }catch(err){
    console.error(err);
    next(err);
  }
}); 

router.get('/quiz-post', (req, res, next) => {
  res.render('quiz-post');
});

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