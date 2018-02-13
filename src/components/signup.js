/* eslint linebreak-style: ["error", "windows"], react/no-unused-state: 0 */
import React, { Component } from 'react';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'TheNyanestCat', // default username
      avatar: 0, // default nyan cat avatar id
      signedUp: false,
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
      username: event.target.value,
    });
  }

  handleClick() {
    this.state.signedUp = true;
    this.setState({
      username: this.state.username,
    });
  }

  render() {
    if (this.state.signedUp) {
      return (
        <div id="SignUp">
          {/* <div id="signup-title">Username</div> */}
          <div>{this.state.username}</div>
          <div id="avatar-container">
            <img className="avatar-option" alt="" src="https://i.imgur.com/rZSkKF0.gif" />
            <img className="avatar-option" alt="" src="https://i.imgur.com/rZSkKF0.gif" />
            <img className="avatar-option" alt="" src="https://i.imgur.com/rZSkKF0.gif" />
            <img className="avatar-option" alt="" src="https://i.imgur.com/rZSkKF0.gif" />
          </div>
        </div>
      );
    } else {
      return (
        <div id="SignUp">
          <div id="signup-title">Sign In</div>
          <input
            type="signup-input"
            placeholder="Enter your username"
            onChange={this.handleChange}
          />
          <input
            type="button"
            value="Sign In"
            onClick={this.handleClick}
          />
        </div>
      );
    }
  }
}

export default SignUp;
