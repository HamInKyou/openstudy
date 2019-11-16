var express = require('express');
var router = express.Router();
const {Post, User} = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login',{ msg : req.flash('msg') });
});
router.get('/home', function(req, res, next) {
  res.render('home');
});
router.get('/my-calendar', function(req, res, next) {
  res.render('my-calendar');
});
router.get('/my_test', function(req, res, next) {
  res.render('my_test');
});
router.get('/register', function(req, res, next) {
  res.render('register');
});
router.get('/study-intro', function(req, res, next) {
  res.render('study-intro');
});
router.get('/study-list', function(req, res, next) {
  res.render('study-list');
});
router.get('/study-post-list', function(req, res, next) {
  res.render('study-post-list');
});
router.get('/study-post', function(req, res, next) {
  res.render('study-post');
});
router.get('/study-week', function(req, res, next) {
  res.render('study-week');
});



module.exports = router;
