import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate  } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newAddressFetch } from '../../redux/address/address';
import { updateAddressFetch } from '../../redux/address/address';
import coPoMexApi from '../../logic/codopomex';
import LoadingSmall from '../loadingSmall';
import Loading from '../loading';


const AddressForm = (props) => {
  const { newAddress } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addressAction = bindActionCreators(newAddressFetch, dispatch);
  const addressActionUpdate = bindActionCreators(updateAddressFetch, dispatch);
  const [formData, setFormData] = useState(props.data);
  const [colList, setColList] = useState([]);
  const [ zipLoading, setZipLoading] = useState(false);
  const [stage, setStage] = useState((newAddress ? 1 : 3));
  const [ submitLoadin, setSubmitLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  const updatePostal = (postal_code) => {
    if (postal_code.length < 6){
      setFormData((prevState) => ({
        ...prevState,
        postal_code,
      }))
    }

    if (postal_code.length === 5 && newAddress){
      setZipLoading(true);
      coPoMexApi(postal_code, updateMunicipio, updateEstado, updatePais, setColList, setStage, setZipLoading);
    }
  };

  const handleNewSubmit = () => {
    setSubmitLoading(true);
    const { 
      colonia, ext_number, int_number, calle,
      municipio, postal_code, estado, pais } = formData;
    addressAction(colonia, ext_number, int_number, calle, municipio, postal_code, estado, pais, setSubmitLoading, setMessage, setStage);
    if (message === "Direccion Agregada!"){
      setFormData(props.data);
    }
  }

  const handleUpdateSubmit = () => {
    setSubmitLoading(true);
    const { 
      id, colonia, ext_number, int_number, calle,
      municipio, postal_code, estado, pais } = formData;
      addressActionUpdate(id, colonia, ext_number, int_number, calle, municipio, postal_code, estado, pais, setSubmitLoading, setMessage);
    if (message.length ===0) {
      navigate("/");
    }
  }

  return (
    <form className="address-form" onSubmit={(e) => e.preventDefault()}>
      <Loading status={submitLoadin} />
      <h1 className="text-info fs-1 text-center mb-3">Agregar una nueva Direccion</h1>
      <div className="row m-0 p-0">
        <div className="col-6 col-md-6 d-flex flex-column" >
          <label className="text-dark fs-5 my-2" >Ingresa tu codigo postal</label>
          <input
            type="number"
            className="address-zipcode"
            value={formData.postal_code} 
            onChange={(e) => updatePostal(e.target.value)}
            placeholder="Codigo Postal"
          />
          <LoadingSmall status={zipLoading} />
        </div>
        <div
          className={ (stage > 1) ? "col-12 col-md-6 d-flex flex-column" : "d-none"}
        >
          <label className="text-dark fs-5 my-2">Municipio</label>
          <input
            type="text"
            className="login-input"
            value={formData.municipio} 
            onChange={(e) => updateMunicipio(e.target.value)}
            placeholder="Municipio"
          />
        </div>
        <div
         className={ (stage > 1) ? "col-12 col-md-6 d-flex flex-column" : "d-none"}
        >
          <label className="text-dark fs-5 my-2">Estado</label>
          <input
            type="text"
            className="login-input"
            value={formData.estado} 
            onChange={(e) => updateEstado(e.target.value)}
            placeholder="Estado"
          />
        </div>
        <div
         className={ (stage > 1) ? "col-12 col-md-6 d-flex flex-column" : "d-none"}
        >
          <label className="text-dark fs-5 my-2">Pais</label>
          <input
            type="text"
            className="login-input"
            value={formData.pais} 
            onChange={(e) => updatePais(e.target.value)}
            placeholder="Pais"
          />
        </div>
        <div
         className={ (stage > 2) ? "col-12 col-md-6 d-flex flex-column" : "d-none"}
        >
          <label className="text-dark fs-5 my-2">Colonia</label>
          <input
            type="text"
            className="login-input"
            value={formData.colonia} 
            onChange={(e) => updateCol(e.target.value)}
            placeholder="Colonia"
          />
        </div>
        <div
         className={ (stage > 2) ? "col-12 col-md-6 d-flex flex-column" : "d-none"}
        >
          <label className="text-dark fs-5 my-2">Ext #</label>
          <input
            type="text"
            className="login-input"
            value={formData.ext_number} 
            onChange={(e) => updateExt(e.target.value)}
            placeholder="Ext #"
          />
        </div>
        <div
         className={ (stage > 2) ? "col-12 col-md-6 d-flex flex-column" : "d-none"}
        >
          <label className="text-dark fs-5 my-2">Int #</label>
          <input
            type="text"
            className="login-input"
            value={formData.int_number} 
            onChange={(e) => updateInt(e.target.value)}
            placeholder="Int #"
          />
        </div>
        <div
         className={ (stage > 2) ? "col-12 col-md-6 d-flex flex-column" : "d-none"}
        >
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
      <div
        className={ (stage > 2) ? "col-12 d-flex justify-content-center" : "d-none"}
      >
         <button
          className={`${( newAddress ? "new-address-btn" : "d-none" )}`}
          onClick={handleNewSubmit}
        >
          Agregar Direccion
        </button>
        <button
          className={`${( newAddress ? "d-none" : "update-address-btn" )}`}
          onClick={handleUpdateSubmit}
        >
          Actualizar Direccion
        </button>
      </div>
      <div className="col-12 d-flex justify-content-center">
        <p className="fs-3 text-info">{message}</p>
      </div>
      <div className={`${(colList.length > 0) ? "colonia-lista-container" : "d-none"}`}>
        <div className="colonia-lista">
          <p>Haz click si ves tu colonia abajo</p>
          <ul className="row m-0 w-100">
            {
              colList.map((col, index) => {
                const i = index + 1;
                return (
                  <li className="col-3 list-group-item bg-transparent border-0 p-2">
                    <button
                      key={i}
                      className="text-wrap col-btn w-100"
                      type="button"
                      onClick={()=> {
                        updateCol(col);
                        setColList([]);
                        setStage(3);
                      }}
                    >
                      {col}
                    </button>
                  </li>
                );
              })
            }
          </ul>
          <button
            type="button"
            className="close-col-list"
            onClick={() => {
              setColList([]);
              setStage(3);
            }}
          >
            No veo mi colonia
          </button>
        </div>
      </div>
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