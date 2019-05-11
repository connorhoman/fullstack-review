import React from 'react';

const Repo = (props) => (
  <div className='repo'>
    <h1><a href={`${props.props.url}`}>{`${props.props.name}`}</a></h1>
    <h2>By: {`${props.props.owner}`}</h2>
    <div>
        <p>{`${props.props.description}`}</p>
        <p># of Forks: {`${props.props.forks}`}</p>
    </div>
  </div>
)

export default Repo;