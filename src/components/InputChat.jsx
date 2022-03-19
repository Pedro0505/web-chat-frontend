import React, { useState, useContext, useEffect } from 'react';
import dayjs from 'dayjs';
import { LoginContext } from '../context/LoginContext';
import '../styles/Chat.scss';
import { GravatarApiContext } from '../context/GravatarApiContext';

function InputChat() {
  const [currMessage, setCurrMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const { userImg } = useContext(GravatarApiContext);
  const { roomContext: { socket, user, room }, handleMessages } = useContext(LoginContext);

  async function sendMessage(event) {
    event.preventDefault();
    const random = Math.random() * (Math.random() * 10);
    const hour = dayjs().hour();
    const minute = dayjs().minute();
    const time = `${hour}:${+minute < 9 ? `0${minute}` : minute}`;
    if (currMessage !== '') {
      const message = {
        id: random,
        userId: socket.id,
        user,
        room,
        currMessage,
        time,
        userImg,
      };
      setMessageList((prevState) => [...prevState, message]);
      await socket.emit('send_message', message);
      setCurrMessage('');
    }
  }

  useEffect(() => {
    if (user || room) {
      socket.on('receive_message', (data) => {
        setMessageList((prevState) => [...prevState, data]);
      });
    }
  }, [socket]);

  function handleSubmitEnter(event) {
    if (event.key === 'Enter') {
      sendMessage(event);
    }
  }

  useEffect(() => {
    handleMessages(messageList);
  }, [messageList]);

  useEffect(() => {
    if (!currMessage) return setDisabled(true);
    return setDisabled(false);
  }, [currMessage]);

  return (
    <div className="form-message">
      <input
        className="chat-input"
        type="text"
        maxLength="500"
        placeholder="Digite aqui sua mensagem..."
        value={currMessage}
        onChange={({ target: { value } }) => setCurrMessage(value)}
        onKeyPress={handleSubmitEnter}
      />
      <button
        onClick={sendMessage}
        className="send-btn"
        type="button"
        disabled={disabled}
      >
        Enviar
      </button>
    </div>
  );
}

export default InputChat;
