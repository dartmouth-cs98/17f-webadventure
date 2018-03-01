/* eslint import/no-webpack-loader-syntax: 0, */

import React from 'react';

const NYAN_CATS = ['https://i.imgur.com/rZSkKF0.gif', 'https://i.imgur.com/YNcTBuU.gif'];
const SONIC = ['https://i.imgur.com/o8Jq7fs.gif', 'https://i.imgur.com/Fu68Kg1.gif'];
const PIKACHU = ['https://i.imgur.com/x5PeYrM.gif', 'https://i.imgur.com/lBC1MrV.gif'];
const LUIGI = ['https://i.imgur.com/aupFa2g.gif', 'https://i.imgur.com/UEI2KTq.gif'];

const DisplayUser = (props) => {
  const handleChange = (event) => {
    let { avatar } = props.user;
    switch (event.target.value) {
      case 'nyan':
        avatar = NYAN_CATS;
        break;
      case 'sonic':
        avatar = SONIC;
        break;
      case 'pikachu':
        avatar = PIKACHU;
        break;
      case 'luigi':
        avatar = LUIGI;
        break;
      default:
        ({ avatar } = props.user);
    }
    props.updateUser({ avatar });
  };

  return (
    <div id="display-user">
      <div>
        {props.user.username}
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
                    checked={props.user.avatar[0] === NYAN_CATS[0]}
                    onChange={handleChange}
                  />
                  <img className="avatar-option" alt="" src={NYAN_CATS[1]} />
                </label>
              </div>
              <div className="avatar-radio">
                <label htmlFor="sonic">
                  <input
                    id="sonic"
                    type="radio"
                    value="sonic"
                    checked={props.user.avatar[0] === SONIC[0]}
                    onChange={handleChange}
                  />
                  <img className="avatar-option" alt="" src={SONIC[1]} />
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
                    checked={props.user.avatar[0] === PIKACHU[0]}
                    onChange={handleChange}
                  />
                  <img className="avatar-option" alt="" src={PIKACHU[1]} />
                </label>
              </div>
              <div className="avatar-radio">
                <label htmlFor="luigi">
                  <input
                    id="luigi"
                    type="radio"
                    value="luigi"
                    checked={props.user.avatar[0] === LUIGI[0]}
                    onChange={handleChange}
                  />
                  <img className="avatar-option" alt="" src={LUIGI[1]} />
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
