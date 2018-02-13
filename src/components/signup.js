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
    // this.setState({
    // username: this.state.username,
    // });
    this.props.signUpLobby(this.state.username);
  }

  render() {
    if (this.state.signedUp) {
      return (
        <div id="SignUp">
          {/* <div id="signup-title">Username</div> */}
          <div>{this.state.username}</div>
          <div id="avatar-container">
            <img className="avatar-option" alt="" avID="0" src="https://i.imgur.com/rZSkKF0.gif" />
            <img className="avatar-option" alt="" avID="1" src="https://i.imgur.com/rZSkKF0.gif" />
            <img className="avatar-option" alt="" avID="2" src="https://i.imgur.com/rZSkKF0.gif" />
            <img className="avatar-option" alt="" avID="3" src="https://i.imgur.com/rZSkKF0.gif" />
          </div>
        </div>
      );
    } else {
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
}

export default SignUp;
