import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GravatarApiProvider } from './context/GravatarApiContext';
import { LoginProvider } from './context/LoginContext';
import Unauthorization from './components/Unauthorization';
import Chat from './pages/Chat';
import Login from './pages/Login';
import './styles/App.scss';

function App() {
  return (
    <LoginProvider>
      <GravatarApiProvider>
        <main className="main-container">
          <Routes>
            <Route path="chat" element={<Chat />} />
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Unauthorization />} />
          </Routes>
        </main>
      </GravatarApiProvider>
    </LoginProvider>
  );
}

export default App;
