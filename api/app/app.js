const express = require('express');
const bodyParser  = require('body-parser');
const express_session = require('express-session');
const redis   = require('redis');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const RedisStore = require('connect-redis')(express_session);

const config = require('./config');
const passport = require('./auth');

const issueRouter = require('./routes/issue.js');
const userRouter = require('./routes/user.js');

const app = express();
const client  = redis.createClient();

app.use(cors(config.app.corsOptions));
app.use((req, res, next) => {
  console.log('logged');
  console.log(req.method);
  if (req.method == 'OPTIONS') {
    console.log('cors');
    console.log(res.getHeaders());
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express_session({
  secret: config.session.secret,
  store: new RedisStore({ 
    host: config.session.host, 
    port: config.session.port, 
    client: client, 
    ttl: config.session.ttl 
  }),
  saveUninitialized: config.session.saveUninitialized,
  resave: config.session.resave
}));
app.use(passport.initialize());
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