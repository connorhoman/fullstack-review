const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = new mongoose.Schema({
  repos: Array,
  repoId: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (inputRepos, callback) => {
  if (inputRepos.message === 'Not Found') {
    callback('Not Found on GitHub');
  } else {
    var savedRepo = new Repo;
    savedRepo.repos = inputRepos;
    savedRepo.repoId = inputRepos[0].Id;
    savedRepo.save();
  }
}

module.exports.save = save;