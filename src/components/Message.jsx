import React from 'react';
import PropTypes from 'prop-types';

function Message({ userId, socketId, currMessage, time, user, userImg }) {
  return (
    <div className={(userId === socketId) ? 'owner' : 'other'}>
      <div className="message">
        <p className="text-message">{ currMessage }</p>
        <p className="time">{ time }</p>
      </div>
      <p className="user">{ user }</p>
      <img className="userImg" src={userImg} alt="Foto de perfil" />
    </div>
  );
}

Message.propTypes = {
  currMessage: PropTypes.string.isRequired,
  socketId: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  userImg: PropTypes.string.isRequired,
};

export default Message;
