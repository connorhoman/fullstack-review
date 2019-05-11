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
  console.log('Receieved POST Request');
  helpers.getReposByUsername(req.body.term, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Found user, sending to Database')
      for (var i = 0; i < data.length; i++) {
        db.save(data[i], (err) => {
          if (err) {
            console.log(err); 
          } else {
            console.log('Succesfully posted to Database');
          }
        });
        
        res.status(200);
        res.send();
      }
    }
  });
});

app.get('/repos', function (req, res) {
  console.log('Recieved GET request');
  db.findRepos((err, data) => {
    if (err) {
      console.log(err)
      // send error down?
    } else {
      console.log('Read repos in Database')
      var repoArray = [];
      for (var i = 0; i < data.length; i++) {
        repoArray.push(data[i]._doc);
      }
      console.log('Sent response to Client')
      res.send(repoArray);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

