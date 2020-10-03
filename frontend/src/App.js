import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    console.log("flag1")
    this.state = {
      error: null,
      isLoaded: false,
      postits: [],
      author: "",
      content: ""
    }
    console.log("flag2")

    this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log("flag3")
  }

  componentDidMount() {
    console.log("flag4")
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


    console.log("flag5")
    const  {error, isLoaded, postits} = this.state;
    if (error) {
      console.log("flag6")
      return <div>Error! {error.message}</div>
    } else if (!isLoaded) {
      console.log("flag7")
      return <div>Loading...</div>
    } else {
      console.log("flag8")
      return (
        <div className="App">
          <div className="App-header">
            <h2>PostIts asdf</h2>
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
