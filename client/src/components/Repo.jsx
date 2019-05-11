import React from 'react';

const Repo = (props) => (
  <div className='repo'>
    <h1><a href={`https://www.github.com/${props.props.owner}/${props.props.name}`}>{`${props.props.name}`}</a></h1>
    <h2>By:<a href={`https://www.github.com/${props.props.owner}`}> {`${props.props.owner}`}</a></h2>
    <div>
        <p>{`${props.props.description}`}</p>
        <p># of Forks: {`${props.props.forks}`}</p>
    </div>
  </div>
)

export default Repo;