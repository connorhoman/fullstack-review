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
      console.log('User not found');
    } else {
      for (var i = 0; i < data.length; i++) {
        db.save(data[i], (err) => {
          if (err) {
            console.log(err);
            res.status(200);
            res.send();
          } else {
            console.log('Succesfully posted to Database');
            res.status(200);
            res.send();
          }
        });
      }
    }
  });
});

app.get('/repos', function (req, res) {
  console.log('Recieved GET request');
  
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

