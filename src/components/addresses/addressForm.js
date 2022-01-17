import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newAddressFetch } from '../../redux/address/address';
import { updateAddressFetch } from '../../redux/address/address';

const AddressForm = (props) => {
  const dispatch = useDispatch();
  const addressAction = bindActionCreators(newAddressFetch, dispatch);
  const addressActionUpdate = bindActionCreators(updateAddressFetch, dispatch);
  const [formData, setFormData] = useState(props.data);
  const { newAddress } = props;

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

  const handleNewSubmit = () => {
    const { 
      colonia, ext_number, int_number, calle,
      municipio, postal_code, estado, pais } = formData;
    addressAction(colonia, ext_number, int_number, calle, municipio, postal_code, estado, pais);
  }

  const handleUpdateSubmit = () => {
    const { 
      id, colonia, ext_number, int_number, calle,
      municipio, postal_code, estado, pais } = formData;
      addressActionUpdate(id, colonia, ext_number, int_number, calle, municipio, postal_code, estado, pais);
  }

  return (
    <form className="login-form" onSubmit={(e) => e.preventDefault()}>
      <label className="login-tittle">Login</label>
      <input
        type="text"
        className="login-input"
        value={formData.colonia} 
        onChange={(e) => updateCol(e.target.value)}
        placeholder="Colonia"
      />
      <input
        type="text"
        className="login-input"
        value={formData.ext_number} 
        onChange={(e) => updateExt(e.target.value)}
        placeholder="Ext #"
      />
      <input
        type="text"
        className="login-input"
        value={formData.int_number} 
        onChange={(e) => updateInt(e.target.value)}
        placeholder="Int #"
      />
      <input
        type="text"
        className="login-input"
        value={formData.calle} 
        onChange={(e) => updateCalle(e.target.value)}
        placeholder="Calle"
      />
      <input
        type="text"
        className="login-input"
        value={formData.municipio} 
        onChange={(e) => updateMunicipio(e.target.value)}
        placeholder="Municipio"
      />
      <input
        type="text"
        className="login-input"
        value={formData.postal_code} 
        onChange={(e) => updatePostal(e.target.value)}
        placeholder="Codigo Postal"
      />
      <input
        type="text"
        className="login-input"
        value={formData.estado} 
        onChange={(e) => updateEstado(e.target.value)}
        placeholder="Estado"
      />
      <input
        type="text"
        className="login-input"
        value={formData.pais} 
        onChange={(e) => updatePais(e.target.value)}
        placeholder="Pais"
      />
      <button
        className={`${( newAddress ? "" : "d-none" )} login-submit`}
        onClick={handleNewSubmit}
      >
        Agregar Direccion
      </button>
      <button
        className={`${( newAddress ? "d-none" : "" )} login-submit`}
        onClick={handleUpdateSubmit}
      >
        Actualizar Direccion
      </button>
    </form>
  );
};

AddressForm.defaultProps = {
  data: {
    id: "",
    colonia: "",
    ext_number:"",
    int_number: "",
    calle: "",
    municipio: "",
    postal_code: "",
    estado: "",
    pais: "",
  },
};

AddressForm.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    colonia: PropTypes.string,
    ext_number: PropTypes.number,
    int_number: PropTypes.number,
    calle: PropTypes.string,
    municipio: PropTypes.string,
    postal_code: PropTypes.number,
    estado: PropTypes.string,
    pais: PropTypes.string,
  }),
  newAddress: PropTypes.bool.isRequired
};

export default AddressForm;