import React from 'react';
import Person from '@material-ui/icons/Person';
import Info from '@material-ui/icons/Info';
import '../styles/Header.scss';

function Header() {
  return (
    <header>
      <button type="button" className="btn-icons">
        <Person className="icons" />
      </button>
      <h1>Chat</h1>
      <button type="button" className="btn-icons">
        <Info className="icons" />
      </button>
    </header>
  );
}

export default Header;
