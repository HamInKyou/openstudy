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
    const myQuiz = await Quiz.findAndCountAll({offset : (pageId-1) * 10, limit : 10, order : [sequelize.literal('id DESC')]}, {where:{owner:req.user.id}});
    res.render('my-test-post', { myQuiz : JSON.stringify(myQuiz) });
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.get('/my-test-solve-particular/:quizId', async(req, res, next) => {
  try{
    const quizId = req.params.quizId;
    const answerPost = await Answer.findAll({where : {quizId : quizId}});
    const quizPost = await Quiz.findOne({where : {id : quizId}});
    let quizAnswer;
    if(quizPost.ownerAnswerId){
      quizAnswer = await Answer.findOne({where : {id : quizPost.ownerAnswerId}});
    }else{
      quizAnswer = 'No Answer';
    }
    const boardName = await Board.findOne({where : {id : quizPost.boardId}, attributes : ['name']});
    res.render('my-test-solve-particular', {myanswer : JSON.stringify(answerPost), quiz : JSON.stringify(quizPost), answer : JSON.stringify(quizAnswer), board : JSON.stringify(boardName)});
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.get('/my-test-solve/:pageId', async(req, res, next) => {
  try{
    const pageId = req.params.pageId;
    const exQuiz = await Quiz.findAndCountAll({offset : (pageId-1) * 10, limit : 10, order : [sequelize.literal('id DESC')]});
    res.render('my-test-solve', { quiz : JSON.stringify(exQuiz) });
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.get('/my-test-post-particular/:quizId', async(req, res, next) => {
  try{
    const quizId = req.params.quizId;
    const quizPost = await Quiz.findOne({where : {id : quizId}});
    const boardName = await Board.findOne({where : {id : quizPost.boardId}, attributes : ['name']});
    const answerPost = await Answer.findAll({where : {id : quizId}});
    res.render('my-test-post-particular', { quiz : JSON.stringify(quizPost), board : JSON.stringify(boardName), answer : JSON.stringify(answerPost)});
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

router.get('/study-post', (req, res, next) => {
  res.render('study-post');
});

router.get('/study-quiz-list/:boardId/:pageId', async(req, res, next) => {
  try{
    const pageId = req.params.pageId;
    const exBoard = await Board.findOne({where : {id : req.params.boardId}, attributes : ['name', 'week', 'info', 'createdAt']});
    const exQuiz = await Quiz.findAll({offset : (pageId-1) * 10, limit : 10, order : [sequelize.literal('id DESC')]}, {attributes : ['name', 'name', 'owner', 'createdAt'], where : {boardId : exBoard.id}});
    res.render('study-quiz-list', {
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
    const exBoard = await Board.findOne({where : {id : req.params.boardId}, attributes : ['name', 'info', 'createdAt', 'week']});
    res.render('quiz-post', { board : JSON.stringify(exBoard) });
  }catch(err){
    console.error(err);
    next(err);
  }
}); 

module.exports = router;