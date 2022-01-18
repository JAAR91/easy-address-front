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
    if (postal_code.length < 6){
      setFormData((prevState) => ({
        ...prevState,
        postal_code,
      }))
    }
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
    <form className="address-form" onSubmit={(e) => e.preventDefault()}>
      <h1 className="text-info fs-1 text-center mb-3">Agregar una nueva Direccion</h1>
      <div className="row m-0 p-0">
        <div className="col-6 d-flex flex-column">
          <label className="text-dark fs-5 my-2" >Codigo Postal</label>
          <input
            type="number"
            className="login-input w-50"
            value={formData.postal_code} 
            onChange={(e) => updatePostal(e.target.value)}
            placeholder="Codigo Postal"
          />
          <label className="text-dark fs-5 my-2">Municipio</label>
          <input
            type="text"
            className="login-input"
            value={formData.municipio} 
            onChange={(e) => updateMunicipio(e.target.value)}
            placeholder="Municipio"
          />
          <label className="text-dark fs-5 my-2">Estado</label>
          <input
            type="text"
            className="login-input"
            value={formData.estado} 
            onChange={(e) => updateEstado(e.target.value)}
            placeholder="Estado"
          />
          <label className="text-dark fs-5 my-2">Pais</label>
          <input
            type="text"
            className="login-input"
            value={formData.pais} 
            onChange={(e) => updatePais(e.target.value)}
            placeholder="Pais"
          />
        </div>
        <div className="col-6 d-flex flex-column">
          <label className="text-dark fs-5 my-2">Colonia</label>
          <input
            type="text"
            className="login-input"
            value={formData.colonia} 
            onChange={(e) => updateCol(e.target.value)}
            placeholder="Colonia"
          />
          <label className="text-dark fs-5 my-2">Ext #</label>
          <input
            type="text"
            className="login-input"
            value={formData.ext_number} 
            onChange={(e) => updateExt(e.target.value)}
            placeholder="Ext #"
          />
          <label className="text-dark fs-5 my-2">Int #</label>
          <input
            type="text"
            className="login-input"
            value={formData.int_number} 
            onChange={(e) => updateInt(e.target.value)}
            placeholder="Int #"
          />
          <label className="text-dark fs-5 my-2">Calle</label>
          <input
            type="text"
            className="login-input"
            value={formData.calle} 
            onChange={(e) => updateCalle(e.target.value)}
            placeholder="Calle"
          />
        </div>
      </div>
      <button
        className={`${( newAddress ? "" : "d-none" )} new-address-btn`}
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