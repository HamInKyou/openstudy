var express = require('express');
var router = express.Router();
const {Post,User,Study,Board,Calendar} = require('../models');
const moment = require('moment');

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
    const Studies = await Study.findAll({});
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

router.get('/my-calendar/', async(req, res, next) => {
  try {
    const month = moment().month;
    const exCalendars = await Calendar.findAll({
      where: {userId: req.user.id }
    });
    const result = JSON.stringify(exCalendars);
    res.render('my-calendar', {
      myCalendars: result,
      nowMonth : month
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});
// ex
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
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

router.get('/create-study', (req, res, next) => {
  res.render('create-study');
});


module.exports = router;