const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = new mongoose.Schema({
  id: Number,
  name: String,
  owner: String,
  url: String,
  description: String,
  forks: Number,
});
let Repo = mongoose.model('Repo', repoSchema);

let save = (repo, callback) => {
  if (repo.message === 'Not Found') {
    callback('Not Found on GitHub', null);
  } else {
    var savedRepo = new Repo;
    savedRepo.id = repo.id;
    savedRepo.name = repo.name;
    savedRepo.owner = repo.owner.login;
    savedRepo.url = repo.url;
    savedRepo.description = repo.description;
    savedRepo.forks = repo.forks_count;
    savedRepo.save();
    callback(null, 'Successfully added Repo to Database');
  }
}

let findRepos = (callback) => {
  Repo.find().limit(25)
    .then(function(data) {
      callback(null, data);
  });
}

module.exports.findRepos = findRepos;
module.exports.save = save;