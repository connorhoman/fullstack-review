import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }
  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:1128/repos',
      dataType: 'JSON',
      success: (data) => {this.setState({repos:data})},
      error: (err) => {console.log(err)}
    })
  }
  search (term) {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:1128/repos',
      data: {term},
      dataType: 'JSON',
      success: () => {console.log(`${term} was searched`)},
      error: (err) => {console.log(err)}
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));