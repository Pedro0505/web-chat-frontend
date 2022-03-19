import React, { useContext } from 'react';
import Header from '../components/Header';
import ScreenChat from '../components/ScreenChat';
import InputChat from '../components/InputChat';
import Model from '../components/Model';
import { LoginContext } from '../context/LoginContext';

function Chat() {
  const { isLoged } = useContext(LoginContext);

  return (
    <>
      { !isLoged && <Model /> }
      <Header />
      <ScreenChat />
      <InputChat />
    </>
  );
}

export default Chat;
