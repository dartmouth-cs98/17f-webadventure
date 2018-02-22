/* eslint import/no-webpack-loader-syntax: 0, */

import React from 'react';

const DisplayUser = (props) => {
  const handleChange = (event) => {
    props.onAvatar(event.target.value);
  };

  return (
    <div id="display-user">
      <div>
        {props.username}
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
                    checked={props.avatar === 'nyan'}
                    onChange={handleChange}
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
                    checked={props.avatar === 'sonic'}
                    onChange={handleChange}
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
                    checked={props.avatar === 'pikachu'}
                    onChange={handleChange}
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
                    checked={props.avatar === 'luigi'}
                    onChange={handleChange}
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
};

export default DisplayUser;
