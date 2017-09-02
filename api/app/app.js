const express = require('express');
const bodyParser  = require('body-parser');
const express_session = require('express-session')
const config = require('./config');
const passport = require('./auth');

const issueRouter = require('./routes/issue.js');
const userRouter = require('./routes/user.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.cookieParser());
app.use(express_session({ secret: 'keyboard cat' }));
app.use(passport.initialize())
app.use(passport.session());

app.use('/', issueRouter);
app.use('/', userRouter);

app.use((req, res, next) => {
  res.status(404);
  res.json({'msg': 'Not Found'});
});

app.listen(config.app.port, () => {
  console.log('server listening on port ' + config.app.port);
});

module.exports = app;