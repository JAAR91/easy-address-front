import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newAddressFetch } from '../../redux/address/address';

const NewAddress = () => {
  const dispatch = useDispatch();
  const addressAction = bindActionCreators(newAddressFetch, dispatch);
  const [formData, setFormData] = useState({
    colonia: "",
    ext_number: "",
    int_number: "",
    calle: "",
    municipio: "",
    postal_code: "",
    estado: "",
    pais: "",
  });

  const updateCol = (colonia) => {
    setFormData((prevState) => ({
      ...prevState,
      colonia,
    }))
  };

  const updateExt = (ext_number) => {
    setFormData((prevState) => ({
      ...prevState,
      ext_number,
    }))
  };

  const updateInt = (int_number) => {
    setFormData((prevState) => ({
      ...prevState,
      int_number,
    }))
  };

  const updateCalle = (calle) => {
    setFormData((prevState) => ({
      ...prevState,
      calle,
    }))
  };

  const updateMunicipio = (municipio) => {
    setFormData((prevState) => ({
      ...prevState,
      municipio,
    }))
  };

  const updatePostal = (postal_code) => {
    setFormData((prevState) => ({
      ...prevState,
      postal_code,
    }))
  };

  const updateEstado = (estado) => {
    setFormData((prevState) => ({
      ...prevState,
      estado,
    }))
  };

  const updatePais = (pais) => {
    setFormData((prevState) => ({
      ...prevState,
      pais,
    }))
  };

  const handleSubmit = () => {
    const { 
      colonia, ext_number, int_number, calle,
      municipio, postal_code, estado, pais } = formData;
    addressAction(colonia, ext_number, int_number, calle, municipio, postal_code, estado, pais);
  }

  return (
    <form className="login-form" onSubmit={(e) => e.preventDefault()}>
      <label className="login-tittle">Login</label>
      <input
        type="text"
        className="login-input"
        value={formData.username} 
        onChange={(e) => updateCol(e.target.value)}
        placeholder="Colonia"
      />
      <input
        type="text"
        className="login-input"
        value={formData.password} 
        onChange={(e) => updateExt(e.target.value)}
        placeholder="Ext #"
      />
      <input
        type="text"
        className="login-input"
        value={formData.password} 
        onChange={(e) => updateInt(e.target.value)}
        placeholder="Int #"
      />
      <input
        type="text"
        className="login-input"
        value={formData.password} 
        onChange={(e) => updateCalle(e.target.value)}
        placeholder="Calle"
      />
      <input
        type="text"
        className="login-input"
        value={formData.password} 
        onChange={(e) => updateMunicipio(e.target.value)}
        placeholder="Municipio"
      />
      <input
        type="text"
        className="login-input"
        value={formData.password} 
        onChange={(e) => updatePostal(e.target.value)}
        placeholder="Codigo Postal"
      />
      <input
        type="text"
        className="login-input"
        value={formData.password} 
        onChange={(e) => updateEstado(e.target.value)}
        placeholder="Estado"
      />
      <input
        type="text"
        className="login-input"
        value={formData.password} 
        onChange={(e) => updatePais(e.target.value)}
        placeholder="Pais"
      />
      <button
        className="login-submit"
        onClick={handleSubmit}
      >
        Agregar Direccion
      </button>
    </form>
  );
};

export default NewAddress;