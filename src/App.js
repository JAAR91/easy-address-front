import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/navbar/navbar';
import HomePage from './components/home/home';
import Session from './components/session/session';
import Address from './components/addresses/Address';

function App() {
  const { session } = useSelector((state) => state);
  return (
    <>
      {
        (session.status) ?
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/address/:id" element={<Address />} />
            </Routes>
          </>
        :
          <Session />
      }
    </>
  );
}

export default App;