import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newUserFetch } from '../../redux/session/session';

const SignUp = () => {
  const dispatch = useDispatch();
  const newUserActiion = bindActionCreators(newUserFetch, dispatch);
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
    newUserActiion(username, password);
  }

  return (
    <form className="login-form" onSubmit={(e) => e.preventDefault()}>
      <label className="login-tittle">Create new User:</label>
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
        SignUp
      </button>
    </form>
  );
};

export default SignUp;