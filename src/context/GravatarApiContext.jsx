import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const GravatarApiContext = createContext();

export function GravatarApiProvider({ children }) {
  const [userImg, setUserImg] = useState('');

  function getUrlGravatar(url) {
    setUserImg(url);
  }

  const context = useMemo(() => ({ getUrlGravatar, userImg }), [getUrlGravatar, userImg]);

  return (
    <GravatarApiContext.Provider value={context}>
      { children }
    </GravatarApiContext.Provider>
  );
}

GravatarApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
