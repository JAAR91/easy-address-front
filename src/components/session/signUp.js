import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newUserFetch } from '../../redux/session/session';
import Loading from '../loading';

const SignUp = () => {
  const dispatch = useDispatch();
  const newUserActiion = bindActionCreators(newUserFetch, dispatch);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [ loading, setLoading ] = useState(false);
  const [ btnState, setBtnState ] = useState(false);
  const [ msg, setMsg ] = useState("");

  const formValidation = () => {
    const { username, password } = formData;
    if (username.length > 3 && password.length > 4){
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  };

  const updateUsername = (username) => {
    setFormData((prevState) => ({
      ...prevState,
      username,
    }))
    formValidation();
  };

  const updatePassword = (password) => {
    setFormData((prevState) => ({
      ...prevState,
      password,
    }))
    formValidation();
  };

  const handleSubmit = () => {
    if (btnState) {
      const { username, password } = formData;
      newUserActiion(username, password, setLoading, setMsg);
    } else {
      setMsg("Todos los campos son requeridos");
    } 
  }

  return (
    <form className="login-form" onSubmit={(e) => e.preventDefault()}>
      <label className="login-tittle">Nuevo Usuario</label>
      <input
        type="text"
        className={(msg && formData.username.length < 4) ? "invalid-input" : "login-input"}
        value={formData.username} 
        onChange={(e) => updateUsername(e.target.value)}
        placeholder="Nombre de usuario"
      />
      <input
        type="password"
        className={(msg && formData.password.length < 4) ? "invalid-input" : "login-input"}
        value={formData.password} 
        onChange={(e) => updatePassword(e.target.value)}
        placeholder="Contrasena"
      />
      <button
        className="login-submit"
        onClick={handleSubmit}
      >
        Registrarse
      </button>
      <Loading status={loading} />
      <p className="text-danger text-center my-1">{msg}</p>
    </form>
  );
};

export default SignUp;