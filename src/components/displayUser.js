import React from 'react';

const DisplayUser = (props) => {
  return (
    <div id="display-user">
      <div>{props.username}</div>
      <div id="avatar-container">
        <img className="avatar-option" alt="" av_id="0" src="https://i.imgur.com/rZSkKF0.gif" />
        <img className="avatar-option" alt="" av_id="1" src="https://media.giphy.com/media/jBvHCY91NcurK/giphy.gif" />
        <img className="avatar-option" alt="" av_id="2" src="https://media.giphy.com/media/jM4bWFBKpSFeo/giphy.gif" />
        <img className="avatar-option" alt="" av_id="3" src="https://media.giphy.com/media/a9291T1hx1I2I/giphy.gif" />
      </div>
    </div>
  );
};

export default DisplayUser;
