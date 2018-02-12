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

  render() {
    if (this.state.signedUp) {
      console.log("signedup is true!");
      return (
        <div id="SignUp">
          <div id="signup-title">Username</div>
          <div>{this.state.username}</div>
          <div id="avatar-container">
            <img class="avatar-option" src='https://i.imgur.com/rZSkKF0.gif'/>
            <img class="avatar-option" src='https://i.imgur.com/rZSkKF0.gif'/>
            <img class="avatar-option" src='https://i.imgur.com/rZSkKF0.gif'/>
            <img class="avatar-option" src='https://i.imgur.com/rZSkKF0.gif'/>
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
