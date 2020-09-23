import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      postits: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:7000/latest")
      .then(res => res.json())
      .then(
        (result) => {
        this.setState({
          isLoaded: true,
          postits: result
        })
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        })
      })
  }

  render() {
    const  {error, isLoaded, postits} = this.state;
    if (error) {
      return <div>Error! {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="App">
          <div className="App-header">
            <h2>PostIts</h2>
          </div>
          <div className="App-content">
            {postits.map(pt => (
              <div className="postit-container">
                <div className="postit-header">{pt.ID} - {pt.Author}</div>
                <div className="postit-content">{pt.Content}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default App;
