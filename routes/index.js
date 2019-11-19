var express = require('express');
var router = express.Router();
const {Post, User, Study, Board} = require('../models');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login',{ msg : req.flash('msg') });
});
router.get('/home', async (req, res, next) => {
  try{
    const exUser = await User.findOne({where : { id : req.user.id}});
    const enrolledStudies = await exUser.getEnrolledStudy({raw : true});
    const result = JSON.stringify(enrolledStudies);
    res.render('home',{myStudies : result });
  }catch(err){
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
router.get('/register', (req, res, next) => {
  res.render('register', { msg : req.flash('msg')});
});
router.get('/study-intro/:studyId', async (req, res, next) => {
  try{
    const studyId = req.params.studyId;

    const exStudy = await Study.findOne({where:{id:studyId}});
    const result = JSON.stringify(exStudy);

    res.render('study-intro', { studyInfo : result });
  }catch(err){
    console.error(err);
    next(err);
  }
});
router.get('/study-list', async (req, res, next) => {
  //mystudylist
  try{
    const exUser = await User.findOne({where : { id : req.user.id}});
    const enrolledStudies = await exUser.getEnrolledStudy({raw : true});
    const result = JSON.stringify(enrolledStudies);
    
    res.render('study-list',{myStudies : result });
  } catch(err) {
    console.error(err);
    next(err);
  }
});
router.get('/study-post-list/:boardId', async (req, res, next)=> {
  try{
    const exPosts = await Post.findAll({ where : { boardId : req.params.boardId}});
    res.render('study-post-list', {posts : JSON.stringify(exPosts)});
  } catch(err) {
    console.error(err);
    next(err);
  }
});
router.get('/study-post', (req, res, next) => {
  res.render('study-post');
});
router.get('/study-week/:studyId', async (req, res, next) => {
  try{
    const exBoards = await Board.findAll({where:{id:req.params.studyId}});
    res.render('study-week',{ boards : JSON.stringify(exBoards)});
  }catch(err){
    console.error(err);
    next(err);
  }
});



module.exports = router;
