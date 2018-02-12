/* eslint linebreak-style: ["error", "windows"] */
import React, { Component } from 'react';

class SignUp extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: 'TheNyanestCat', // default username
      avatar: 0 // default nyan cat avatar id
    };

    this.signUpUser = this.signUpUser.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  signUpUser() {
    // do check for empty string
    this.username = '';
  }

  getInitialState() {
    return { input: '' };
  }

  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  handleClick() {
    console.log(this.state.input);
  }

  render() {
    return (
      /*<div id="signup">
        <div id="signup-title">SIGN IN</div>
        <input id="signup-input"
          placeholder="Private Game Key"
          value={this.username}
        />
        <button onClick={this.signUpUser}>
          ->
        </button>
      </div>
      */
      <div id="SignUp">
        <input type="text" onChange={ this.handleChange } />
        <input
          type="button"
          value="Alert the text input"
          onClick={ this.handleClick }
        />
      </div>
    );
  }
}

export default SignUp;
