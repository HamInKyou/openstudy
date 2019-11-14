var express = require('express');
var router = express.Router();
const {Post, User} = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login.html');
});
router.get('/home.html', function(req, res, next) {
  res.render('home.html');
});
router.get('/my-calendar.html', function(req, res, next) {
  res.render('my-calendar.html');
});
router.get('/my_test.html', function(req, res, next) {
  res.render('my_test.html');
});
router.get('/register.html', function(req, res, next) {
  res.render('register.html');
});
router.get('/study-intro.html', function(req, res, next) {
  res.render('study-intro.html');
});
router.get('/study-list.html', function(req, res, next) {
  res.render('study-list.html');
});
router.get('/study-post-list.html', function(req, res, next) {
  res.render('study-post-list.html');
});
router.get('/study-post.html', function(req, res, next) {
  res.render('study-post.html');
});
router.get('/study-week.html', function(req, res, next) {
  res.render('/study-week.html');
});



module.exports = router;
