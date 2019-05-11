const bodyParser = require('body-parser');
const express = require('express');
const helpers = require('../helpers/github.js');
const db = require('../database/index');

let app = express();

app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: true}));      
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  helpers.getReposByUsername(req.body.term, (err, data) => {
    if (err) {
      res.status(404);
      res.end(err);
    } else {
      for (var i = 0; i < data.length; i++) {
        db.save(data[i], (err, success) => {
          if (err) {
            console.log(err); 
          } else {
            console.log(success);
          }
        });
        res.status(202);
        res.send();
      }
    }
  });
});

app.get('/repos', function (req, res) {
  db.findRepos((err, data) => {
    if (err) {
      res.status(404);
      res.send(err);
    } else {
      var repoArray = [];
      for (var i = 0; i < data.length; i++) {
        repoArray.push(data[i]._doc);
      }
      res.status(200);
      res.send(repoArray);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

