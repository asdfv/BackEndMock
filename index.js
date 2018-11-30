const fs = require('fs');
const moment = require('moment');
const express = require('express');
const bodyParser = require('body-parser');
const delay = require('express-delay');

const app = express();

const repos = JSON.parse(fs.readFileSync('./responses/repos.json', 'utf8'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(delay(100));

app.get('/users/asdfv/repos', (request, response) => {
  console.log(moment().format('YYYY-MM-DD h:mm:ss') + ' - get repos');
  response.json(repos);
});

app.listen(8000, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log('server is listening on 8000');
});
