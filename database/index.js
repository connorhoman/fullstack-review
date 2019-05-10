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

let save = (repo) => {
  if (repo.message === 'Not Found') {
    console.log('Not Found on GitHub');
  } else {
    console.log('Added repo(s) to database')
    var savedRepo = new Repo;
    savedRepo.id = repo.id;
    savedRepo.name = repo.name;
    savedRepo.owner = repo.owner.login;
    savedRepo.url = repo.url;
    savedRepo.description = repo.description;
    savedRepo.forks = repo.forks_count;
    savedRepo.save();
  }
}


module.exports.save = save;