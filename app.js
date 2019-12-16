const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
const { sequelize } = require('./models');
const passportConfig = require('./passport');
const flash = require('connect-flash');
const app = express();
const webSocket = require('./socket');

const pageRouter = require('./routes/index');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const studyRouter = require('./routes/studies');
const imgRouter = require('./routes/img');
const quizRouter = require('./routes/quiz');
const answerRouter = require('./routes/answer');
const postRouter = require('./routes/posts');
const boardRouter = require('./routes/board');
const tagRouter = require('./routes/tag');


// const makeDummyData = require('./routes/makeDummyData');

// middleware setup
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8001);
app.use(flash());
sequelize.sync();
passportConfig(passport);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/')));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie:{
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());

//router
app.use('/', pageRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/study', studyRouter);
app.use('/img', imgRouter);
app.use('/quiz', quizRouter);
app.use('/answer', answerRouter);
app.use('/post', postRouter);
app.use('/board', boardRouter);
app.use('/quiz', quizRouter);
app.use('/answer', answerRouter);
app.use('/tag', tagRouter);
// app.use('/makeDummyData', makeDummyData);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
})

// error handler
app.use((err, req, res)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = app.listen(app.get('port'), () =>{
  console.log(app.get('port'),  ': is waitting...');
});
webSocket(server, app);

module.exports = app;
