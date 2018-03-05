/* eslint linebreak-style: ["error", "windows"], react/no-unused-state: 0 */
import React, { Component } from 'react';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '', // default username
      avatar: 0, // default nyan cat avatar id
      errorMsg: false,
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.signInSubmit = this.signInSubmit.bind(this);
  }

  handleUsername(event) {
    this.setState({ username: event.target.value });
  }

  signInSubmit(event) {
    event.preventDefault();
    if (this.props.allUsers.some(e => e.username === this.state.username)) {
      this.setState({ errorMsg: 'Sorry! That username is currently signed in!' });
    } else if (this.state.username === '' || this.state.username.length > 12) {
      this.setState({ errorMsg: 'Please enter a valid username (less than 12 chars)!' });
    } else if (!this.state.username.match(/^[0-9a-zA-Z]+$/)) {
      this.setState({ errorMsg: 'Please use only alphanumeric characters!' });
    } else {
      this.props.signUpLobby(this.state.username);
    }
  }

  renderErrorMessage() {
    if (this.state.errorMsg) {
      return (
        <div className="errorMsg">{this.state.errorMsg}</div>
      );
    } else {
      return (<div />);
    }
  }

  render() {
    return (
      <div id="SignUp">
        <div id="submit-fields">
          <form onSubmit={this.signInSubmit}>
            <input
              type="text"
              placeholder="Enter your username"
              onChange={this.handleUsername}
              value={this.state.username}
            />
            <button className="colorful-button" type="submit">Sign Up</button>
          </form>
        </div>
        {this.renderErrorMessage()}
      </div>
    );
  }
}

export default SignUp;
