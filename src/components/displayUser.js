/* eslint import/no-webpack-loader-syntax: 0, max-len:0 */

import React, { Component } from 'react';
// import pencil from '../../assets/pencil.svg';

class DisplayUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      isEditing: false,
      errorMsg: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.toggleEditIcon = this.toggleEditIcon.bind(this);
    this.toggleEditState = this.toggleEditState.bind(this);
    this.renderUsername = this.renderUsername.bind(this);
    this.renderErrorMessage = this.renderErrorMessage.bind(this);
    this.onInputUsernameChange = this.onInputUsernameChange.bind(this);
  }

  onInputUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handleChange(event) {
    this.props.onAvatar(event.target.value);
  }

  toggleEditState() {
    if (this.state.isEditing) {
      this.props.onUsername(this.state.username);
      this.setState({ isEditing: false, errorMsg: false });
      if (this.state.username === '' || this.state.username.length > 12) {
        this.setState({ isEditing: true, errorMsg: true });
      }
    } else {
      this.setState({ isEditing: true, errorMsg: false });
    }
  }

  toggleEditIcon() {
    if (this.state.isEditing) {
      return (
        <div>
          <div
            id="icon-button"
            title="Finish Editing"
            onClick={this.toggleEditState}
            role="button"
            tabIndex={0}
          >
            <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
        </div>
      );
    } else {
      return (
        <div
          id="icon-button"
          title="Edit Username"
          onClick={this.toggleEditState}
          role="button"
          tabIndex={0}
        >
          <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </div>
      );
    }
  }

  renderUsername() {
    if (this.state.isEditing) {
      return <input id="username-edit" placeholder="New username" onChange={this.onInputUsernameChange} value={this.state.username} />;
    } else {
      return <div>{this.state.username}</div>;
    }
  }

  renderErrorMessage() {
    if (this.state.errorMsg) {
      return (
        <div className="errorMsg">Must be valid username (less than 12 chars)!</div>
      );
    } else {
      return (<div />);
    }
  }

  render() {
    return (
      <div id="display-user">
        {this.renderErrorMessage()}
        <div id="username-row">
          <div className="empty-div" />
          {this.renderUsername()}
          <div id="icon-button">
            {this.toggleEditIcon()}
          </div>
        </div>
        <div>
          <form>
            <div id="avatars">
              <div className="avatar-options-row">
                <div className="avatar-radio">
                  <label htmlFor="nyan">
                    <input
                      id="nyan"
                      type="radio"
                      value="nyan"
                      checked={this.props.avatar === 'nyan'}
                      onChange={this.handleChange}
                    />
                    <img className="avatar-option" alt="" src="https://i.imgur.com/rZSkKF0.gif" />
                  </label>
                </div>
                <div className="avatar-radio">
                  <label htmlFor="sonic">
                    <input
                      id="sonic"
                      type="radio"
                      value="sonic"
                      checked={this.props.avatar === 'sonic'}
                      onChange={this.handleChange}
                    />
                    <img className="avatar-option" alt="" src="https://media.giphy.com/media/jBvHCY91NcurK/giphy.gif" />
                  </label>
                </div>
              </div>
              <div className="avatar-options-row">
                <div className="avatar-radio">
                  <label htmlFor="pikachu">
                    <input
                      id="pikachu"
                      type="radio"
                      value="pikachu"
                      checked={this.props.avatar === 'pikachu'}
                      onChange={this.handleChange}
                    />
                    <img className="avatar-option" alt="" src="https://media.giphy.com/media/jM4bWFBKpSFeo/giphy.gif" />
                  </label>
                </div>
                <div className="avatar-radio">
                  <label htmlFor="luigi">
                    <input
                      id="luigi"
                      type="radio"
                      value="luigi"
                      checked={this.props.avatar === 'luigi'}
                      onChange={this.handleChange}
                    />
                    <img className="avatar-option" alt="" src="https://media.giphy.com/media/a9291T1hx1I2I/giphy.gif" />
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default DisplayUser;
