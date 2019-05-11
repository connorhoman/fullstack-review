import React from 'react';
import Repo from './Repo.jsx';

const RepoList = (props) => (
  <div className='repoList'>
    {props.repos.map(repo => <Repo key={repo.id} props={repo} />)}
  </div>
)

export default RepoList;