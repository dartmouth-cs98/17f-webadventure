/* eslint linebreak-style: ["error", "windows"], react/no-unused-state: 0 */
import React, { Component } from 'react';
import { Quickstart, generateId } from './quickstart';

// Three choices: must be type=string or choice selection breaks
const DEFAULT = 'default';
const QUICKSTART = 'one';
const SIGNUP = 'two';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '', // default username
      avatar: 0, // default nyan cat avatar id
      errorMsg: false,
      choice: DEFAULT, // either 'default', 'quickstart, or 'signup'
    };
  }

  signInSubmit = (event) => {
    event.preventDefault(); // prevents default behavior of the event
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

  handleUsername = (event) => {
    this.setState({ username: event.target.value });
  }

  handleChoice = (event) => {
    this.setState({ choice: event.target.getAttribute('type') });
    if (event.target.getAttribute('type') === QUICKSTART) {
      this.props.signUpLobby(generateId()); // skips to game
      this.props.quickstart();
    }
  }

  renderErrorMessage = () => {
    if (this.state.errorMsg) {
      return (
        <div className="errorMsg">{this.state.errorMsg}</div>
      );
    } else {
      return (<div />);
    }
  }

  renderChoices = () => {
    switch (this.state.choice) {
      case DEFAULT:
        return (
          <div id="submit-fields">
            <button
              className="colorful-button"
              type={QUICKSTART}
              onClick={this.handleChoice}
            >
            Quickstart!
            </button>
            <span>or</span>
            <button
              className="colorful-button"
              type={SIGNUP}
              onClick={this.handleChoice}
            >
            Sign Up
            </button>
          </div>
        );
      case SIGNUP:
        return (
          <form onSubmit={this.signInSubmit}>
            <input
              type="text"
              placeholder="Enter your username"
              onChange={this.handleUsername}
              value={this.state.username}
            />
            <button className="colorful-button" type="submit">Sign Up</button>
          </form>
        );
      case QUICKSTART:
        return (
          <Quickstart />
        );
      default:
        return (
          <div id="submit-fields">
            <form onSubmit={this.signInSubmit}>
              <input
                type="text"
                placeholder="Enter your username"
                onChange={this.handleUsername}
                value={this.state.username}
              />
              <button className="colorful-button" type="submit">Sign Up</button>
              <span>or</span>
              <Quickstart />
            </form>
          </div>
        );
    }
  }

  render = () => {
    return (
      <div id="SignUp">
        <div id="submit-fields">
          {this.renderChoices()}
        </div>
        {this.renderErrorMessage()}
      </div>
    );
  }
}

export default SignUp;
