const bodyParser = require('body-parser');
const express = require('express');
const getReposByUsername = require('../helpers/github.js');
const save = require('../database/index');

let app = express();

app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: true}));      
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  console.log('Receieved POST Request');
  getReposByUsername.getReposByUsername(req.body.term, (err, data) => {
    if (err) {
      console.log('User not found');
    } else {
      save.save(data, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Succesfully posted to Database');
          res.status(200);
          res.send();
        }
      });
    }
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

