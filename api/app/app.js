const app = require('express')();
const bodyParser  = require('body-parser');

const issueRouter = require('./routes/issue.js');
const config = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', issueRouter);

app.use((req, res, next) => {
  res.status(404);
  res.json({'msg': 'Not Found'});
});

app.listen(config.app.port, () => {
  console.log('server listening on port ' + config.app.port);
});