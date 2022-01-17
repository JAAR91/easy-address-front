import React, { useState} from 'react';
import Login from './login';
import SignUp from './signUp';
import "./session.css";

const Session = () => {
  const [ sessionOption, setSessionOption ] = useState(true);
  return (
    <div className="session-container">
      {
        sessionOption ?
          <Login />
        :
          <SignUp />
      }
      <div>
        {
          sessionOption ?
            <button className="session-link" onClick={()=> setSessionOption(false)}>SignUp</button>
          :
            <button className="session-link" onClick={()=> setSessionOption(true)}>Login</button>
        }
      </div>
    </div>
  );
};

export default Session;