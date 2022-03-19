import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Chat.scss';

function Unauthorization() {
  return (
    <div className="unauthorization">
      <h1>
        Sem Autorização faça o
        <Link to="/"> Login</Link>
      </h1>
    </div>
  );
}

export default Unauthorization;
