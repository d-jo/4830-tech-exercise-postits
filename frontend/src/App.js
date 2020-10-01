import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      postits: [],
      author: "",
      content: ""
    }

    this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("/latest")
      .then(res => res.json())
      .then(
        (result) => {
        console.log(result)
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

  handleChangeAuthor(event) {
    this.setState({author: event.target.value});
  }

  handleChangeContent(event) {
    this.setState({content: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('going');
    fetch("/insert", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({author: this.state.author, content: this.state.content})
    }).then(() => {
      fetch("/latest")
      .then(res => res.json())
      .then(
        (result) => {
        console.log(result)
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
            <div className="postit_input_container">
              <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChangeAuthor} value={this.state.author} type="text" id="author" name="author" className="cent"/>
                <textarea onChange={this.handleChangeContent} value={this.state.content} type="text" id="content" name="content" className="cent"/>
                <button type="submit" className="cent">Submit</button>
              </form>
            </div>
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
