const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = new mongoose.Schema({
  repo = Object,
  repoId = Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (inputRepo) => {
  var savedRepo = new Repo;
  savedRepo.repo = inputRepo;
  savedRepo.repoId = input.Id;
  savedRepo.save();
}

module.exports.save = save;