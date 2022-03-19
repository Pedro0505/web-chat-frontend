import React, { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import '../styles/Chat.scss';
import Message from './Message';

function ScreenChat() {
  const { messages, roomContext: { socket } } = useContext(LoginContext);
  return (
    <main className="chat-container">
      {
        messages.map(({ userId, currMessage, time, user, id, userImg }) => (
          <Message
            key={id}
            userId={userId}
            currMessage={currMessage}
            time={time}
            user={user}
            id={id}
            socketId={socket.id}
            userImg={userImg}
          />
        ))
      }
    </main>
  );
}

export default ScreenChat;
