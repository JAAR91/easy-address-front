import React from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logOutSession } from '../redux/session/session';

const LogOut = () => {
  const dispatch = useDispatch();
  const loggOff = bindActionCreators(logOutSession, dispatch);

  const logginOutBtnHandle = () => {
    loggOff();
  };

  return (
    <button
      type="button"
      className="logout-link"
      onClick={logginOutBtnHandle}
    >
      CERRAR SESION
    </button>
  );
};

export default LogOut;