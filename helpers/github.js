const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, function(err, res, body) {
    var json = JSON.parse(body);
    console.log(json.message);
    if (json.message === 'Not Found') {
      callback('User not Found', null);
    } else {
      callback(null, json);
    }
  })
}

module.exports.getReposByUsername = getReposByUsername;