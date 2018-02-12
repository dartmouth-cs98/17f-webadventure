/* eslint linebreak-style: ["error", "windows"] */
import React, { Component } from 'react';

class SignUp extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: 'TheNyanestCat', // default username
      avatar: 0, // default nyan cat avatar id
      signedUp: false
    };

    this.getInitialState = this.getInitialState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
  }

  getInitialState() {
    return { username: '' };
  }

  handleChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handleClick() {
    console.log("signup username: "+this.state.username);
    // replace div with signed up modal
    this.state.signedUp = true;
    // this.render();
    this.setState({
      username: this.state.username
    })
  }

  onItemClick(event) {
    //select avatar
    // this.state.avatar = 1;
    event.currentTarget.style.border = '20px';
    this.setState({
      avatar: event.target.av-id
    });
  }

  render() {
    if (this.state.signedUp) {
      console.log("signedup is true!");
      return (
        <div id="SignUp">
          <div id="signup-title">Username</div>
          <div>{this.state.username}</div>
          <div id="avatar-container">
            <img className="avatar-option" onClick={this.onItemClick} av-id='0' src='https://i.imgur.com/rZSkKF0.gif'/>
            <img className="avatar-option" onClick={this.onItemClick} av-id='1' src='https://i.imgur.com/YNcTBuU.gif'/>
            <img className="avatar-option" onClick={this.onItemClick} av-id='2' src='https://i.imgur.com/rZSkKF0.gif'/>
            <img className="avatar-option" onClick={this.onItemClick} av-id='3' src='https://i.imgur.com/rZSkKF0.gif'/>
          </div>
        </div>
      );
    }
    else {
      console.log("signedup is false!");
      return (
        <div id="SignUp">
          <div id="signup-title">SIGN IN</div>
          <input type="signup-input"
            placeholder="Enter your username"
            onChange={ this.handleChange } />
          <input
            type="button"
            value="Sign In"
            onClick={ this.handleClick }
          />
        </div>
      );
    }
  }
}

export default SignUp;
