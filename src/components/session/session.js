import React, { useState} from 'react';
import Login from './login';
import SignUp from './signUp';
import "./session.css";

const Session = () => {
  const [ sessionOption, setSessionOption ] = useState(true);
  return (
    <div className="session-container">
      <div className="forms-container">
        {
          sessionOption ?
            <Login />
          :
            <SignUp />
        }
        <div>
          {
            sessionOption ?
              <button className="session-link" onClick={()=> setSessionOption(false)}>Registrate</button>
            :
              <button className="session-link" onClick={()=> setSessionOption(true)}>Ya tienes cuenta</button>
          }
        </div>
      </div>
    </div>
  );
};

export default Session;