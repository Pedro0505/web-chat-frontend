import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [roomContext, setRoomContext] = useState({ socket: {}, user: '', room: '' });
  const [messages, setMessages] = useState([]);
  const [isLoged, setIsLoged] = useState(false);

  function handleSocket(info) {
    setRoomContext(info);
  }

  function handleMessages(infoMessages) {
    setMessages(infoMessages);
  }

  const context = useMemo(() => (
    {
      roomContext,
      handleSocket,
      messages,
      handleMessages,
      isLoged,
      setIsLoged,
    }
  ), [roomContext, handleSocket, messages, handleMessages, isLoged, setIsLoged]);

  return (
    <LoginContext.Provider value={context}>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
