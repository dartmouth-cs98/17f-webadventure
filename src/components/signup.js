/* eslint linebreak-style: ["error", "windows"] */
import React, { Component } from 'react';

class SignUp extends Component {
  constructor(props) {
    super(props);
    
    this.username = 'TheNyanestCat'; // default username
    this.avatar = 0; // default nyan cat avatar

    this.signInUser = this.signInUser.bind(this);
  }

  componentDidMount() {
  }

  onInputKey(event) {
    this.setState({
      joinKey: event.target.value,
    });
  }

  signUpUser() {
    // do check for empty string
    this.username =
  }

  onSignUp(event) {

  }

  render() {
    return (
      <div id="signup">
        <div id="signup-title">SIGN IN</div>
        
        <div id="signup-input">
          <input
            placeholder="Private Game Key"
            value={this.username}
            onChange={this.onSignUp}
          />
          <button onClick={this.signUpUser}>
            Sign In
          </button>
        </div>
        <div>{this.state.hostKey}</div>
      </div>
    );
  }
}

export default SignUp;
