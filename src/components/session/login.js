import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginFetch } from '../../redux/session/session';

const Login = () => {
  const dispatch = useDispatch();
  const loginAction = bindActionCreators(loginFetch, dispatch);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const updateUsername = (username) => {
    setFormData((prevState) => ({
      ...prevState,
      username,
    }))
  };

  const updatePassword = (password) => {
    setFormData((prevState) => ({
      ...prevState,
      password,
    }))
  };

  const handleSubmit = () => {
    const { username, password} = formData;
    loginAction(username, password);
  }

  return (
    <form className="login-form" onSubmit={(e) => e.preventDefault()}>
      <label className="login-title">Login:</label>
      <input
        type="text"
        className="login-input"
        value={formData.username} 
        onChange={(e) => updateUsername(e.target.value)}
      />
      <input
        type="password"
        className="login-input"
        value={formData.password} 
        onChange={(e) => updatePassword(e.target.value)}
      />
      <button
        className="login-submit"
        onClick={handleSubmit}
      >
        Login
      </button>
    </form>
  );
};

export default Login;