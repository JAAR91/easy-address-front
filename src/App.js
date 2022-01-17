import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './components/home/home';
import Session from './components/session/session';

function App() {
  const { session } = useSelector((state) => state);
  return (
    <>
      {
        (session.status) ?
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        :
          <Session />
      }
    </>
  );
}

export default App;