import React, { useState, useContext, useEffect } from 'react';
import '../styles/Login.scss';
import io from 'socket.io-client';
import md5 from 'crypto-js/md5';
import { useNavigate } from 'react-router-dom';
import imageLogin from '../images/login-image.svg';
import { LoginContext } from '../context/LoginContext';
import { GravatarApiContext } from '../context/GravatarApiContext';

function Login() {
  const { handleSocket, setIsLoged } = useContext(LoginContext);
  const { getUrlGravatar } = useContext(GravatarApiContext);
  const [user, setUser] = useState('');
  const [room, setRoom] = useState('');
  const [email, setEmail] = useState('');
  const [disbled, setDisabled] = useState(true);
  const navigate = useNavigate();

  function gravatarEmailImg() {
    const hash = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;

    getUrlGravatar(url);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const socket = io.connect(process.env.REACT_APP_BACK_URL);
    socket.emit('join_room', room);
    if (user !== '' && room !== '') {
      const info = { socket, user, room };
      handleSocket(info);
      navigate('/chat');
      gravatarEmailImg();
      setIsLoged(true);
    }
  }

  function handleSubmitEnter(event) {
    if (event.key === 'Enter') {
      handleSubmit(event);
      gravatarEmailImg();
    }
  }

  useEffect(() => {
    const regExpEmail = /\w+[@]\w+[.]\w+/;
    if (!room || !user || !email || !regExpEmail.test(email)) return setDisabled(true);
    return setDisabled(false);
  }, [room, user, email]);

  return (
    <main className="login-container">
      <img src={imageLogin} alt="Imagem ilustrativa de um chat" />
      <form className="form-login">
        <label htmlFor="user" className="label-login">
          Seu Nome:
          <input
            type="text"
            id="user"
            onChange={({ target: { value } }) => setUser(value)}
          />
        </label>
        <label htmlFor="email" className="label-login">
          Seu Email:
          <input
            type="text"
            id="email"
            onChange={({ target: { value } }) => setEmail(value)}
          />
        </label>
        <label htmlFor="room" className="label-login">
          Entre em uma sala:
          <input
            type="text"
            id="room"
            onChange={({ target: { value } }) => setRoom(value)}
            onKeyPress={handleSubmitEnter}
          />
        </label>
        <button
          onClick={handleSubmit}
          type="button"
          className="login-btn"
          disabled={disbled}
        >
          Entrar
        </button>
      </form>
    </main>
  );
}

export default Login;
