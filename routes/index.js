var express = require('express');
var router = express.Router();
const {Post, User, Study,Submit, Board, Quiz, Answer, Sequelize:{Op}} = require('../models');

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
    const resultEnrolled = JSON.stringify(enrolledStudies);
    const Studies = await Study.findAll({}); //myStudies와 중복되지 않게 고쳐야함
    const resultStudies = JSON.stringify(Studies);
    res.render('home', {
      myStudies: resultEnrolled,
      Studies: resultStudies
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
      quizAnswer = await Answer.findOne({where : {id : value}});
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
    let quizAnswer;
    if(quizPost.ownerAnswerId == null){
      quizAnswer = 'No Answer';
    }else{
      quizAnswer = await Answer.findOne({where : {id : quizPost.ownerAnswerId}});
    }
    const answerPost = await Answer.findAll({where : {id : {[Op.ne] : [quizPost.ownerAnswerId]}, quizId : quizId}, include : [{
      model : User,
      attributes : ['id', 'nick'],
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

router.get('/openstudy-intro/:studyId', async (req, res, next) => {
  try {
    const studyId = req.params.studyId;
    const exStudy = await Study.findOne({
      where: {
        id: studyId
      }
    });
    const result = JSON.stringify(exStudy);

    res.render('openstudy-intro', {
      studyInfo: result
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/add-outline', (req, res, next) => {
  res.render('add-outline');
});

router.get('/study-list', async (req, res, next) => {
  //studylist
  try {
    const exStudy = await Study.findAll();

    res.render('study-list', {
      studies: JSON.stringify(exStudy)
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/mystudy-list', async (req, res, next) => {
  //mystudylist
  try {
    const exUser = await User.findOne({
      where: {
        id: req.user.id
      }
    });
    const enrolledStudies = await exUser.getEnrolledStudy({raw: true});
    const result = JSON.stringify(enrolledStudies);

    res.render('mystudy-list', {
      myStudies: result
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/study-post-content/:postId', async(req, res, next) => {
  try{
    const exPost = await Post.findOne({include : [{
      model : User,
      attributes : ['id', 'nick'],
      raw : true
      }],
      where : {id : req.params.postId}
    });
    const exBoard = await Board.findOne({where : {id : exPost.boardId}});
    const exStudy = await Study.findOne({where : {id : exBoard.studyId}})
    res.render('study-post-content', {
      study : JSON.stringify(exStudy), board : JSON.stringify(exBoard), post : JSON.stringify(exPost)
    });
  } catch (err){
    console.error(err);
    next(err);
  }
});

router.get('/study-post-list/:boardId/:pageId', async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    const pageId = req.params.pageId;
    const exBoard = await Board.findOne({where : {
      id : boardId
    }});
    const exStudy = await Study.findOne({where : {id : exBoard.studyId}});
    const exPosts = await Post.findAll({
      include : {
        model : User,
        attributes : ['id', 'nick'],
        raw : true
      },
      where: {
        boardId: req.params.boardId
      },
      offset : (pageId-1) * 10, limit : 10, order : [sequelize.literal('id DESC')]
    });
    res.render('study-post-list', {
      page : pageId, study : JSON.stringify(exStudy), board : JSON.stringify(exBoard), posts: JSON.stringify(exPosts)
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
    const studyId = req.params.studyId;
    const exStudy = await Study.findOne({where : {id : studyId}})
    const exBoards = await Board.findAll({
      where: {
        studyId: studyId
      }
    });
    res.render('study-week', {
      study : JSON.stringify(exStudy), boards: JSON.stringify(exBoards)
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

router.get('/my-study-percent/:studyId', async (req, res, next) => {
  try {
      const studyIdParam = req.params.studyId;
      const myStudy = await Study.findOne({ //통계알고싶은 스터디
          where: {id: studyIdParam}
      });
     const studyMembers = await myStudy.getMember(); //스터디의 인원 알기위해
     const boards = await Board.findAll({ //그 스터디의 게시판
         where: {studyId: studyIdParam }
     });
     const Submits =await Submit.findAll({}); //제출-> 프론트에서 여기서 boarId일치하는거 뽑아야함
    
     const resultStudy = JSON.stringify(myStudy);
     const resultMembers = JSON.stringify(studyMembers);
     const resultBoards = JSON.stringify(boards);
    const resultSubmits = JSON.stringify(Submits);
    const resultUserId = JSON.stringify(req.user.id);
    //const resultPosts = JSON.stringify(posts);
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


module.exports = router;