/* eslint linebreak-style: ["error", "windows"], react/no-unused-state: 0 */
import React, { Component } from 'react';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.username, // default username
      avatar: 0, // default nyan cat avatar id
      signedUp: this.props.signedUp,
    };

    this.getInitialState = this.getInitialState.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.signinClick = this.signinClick.bind(this);
  }

  getInitialState() {
    return { username: '' };
  }

  changeUsername(event) {
    this.setState({
      username: event.target.value,
    });
  }

  signinClick() {
    this.state.signedUp = true;
    this.props.signUpLobby(this.state.username);
  }

  render() {
    return (
      <div id="SignUp">
        <div id="signup-title">SIGN IN</div>
        <input
          type="signup-input"
          placeholder="Enter your username"
          onChange={this.changeUsername}
        />
        <input
          type="button"
          value="Sign In"
          onClick={this.signinClick}
        />
      </div>
    );
  }
}

export default SignUp;
