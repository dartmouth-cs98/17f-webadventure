import React from 'react';

const DisplayUser = (props) => {
  return (
    <div id="display-user">
      <div>{props.username}</div>
      <div id="avatar-container">
        <img className="avatar-option" alt="" av_id="0" src="https://i.imgur.com/rZSkKF0.gif" />
        <img className="avatar-option" alt="" av_id="1" src="https://media.giphy.com/media/jBvHCY91NcurK/giphy.gif" />
        <img className="avatar-option" alt="" av_id="2" src="http://24.media.tumblr.com/6ddc22c5ca5b40f069f1206a15e75104/tumblr_msokfsdfR81scncwdo1_500.gif" />
        <img className="avatar-option" alt="" av_id="3" src="http://i49.photobucket.com/albums/f298/OnePieceAccount/luffyrun.gif" />
      </div>
    </div>
  );
};

export default DisplayUser;
