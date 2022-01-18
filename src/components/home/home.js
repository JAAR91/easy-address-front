import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { addressFetch } from '../../redux/address/address';
import DeleteAddress from '../addresses/deleteAddress';
import "./home.css"

const HomePage = () => {
  const { addresses } = useSelector((state) => state);
  const dispatch = useDispatch();
  const loadAddresses = bindActionCreators(addressFetch, dispatch);
  const navigate = useNavigate();

  const newAddressBtn = () => {
    navigate("/address/new");
  };

  useEffect(() => {
    loadAddresses();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="home-container">
      <div className="container">
        <ul className="row m-0 p-0">
          {
            (addresses.length > 0) ?
              addresses.map((address) => (
                <li key={address.id} className="col-sm-12 col-md-6 col-lg-6 col-xl-4 li-container">
                  <div className="address-container">
                    <div className="address-part">
                      <p>Colonia: {address.colonia}</p>
                      <p>Ext #: {address.ext_number}</p>
                      <p>Int #: {address.int_number}</p>
                      <p>Calle: {address.calle}</p>
                      <p>Municipio: {address.municipio}</p>
                      <p>Codigo Postal: {address.postal_code}</p>
                      <p>Estado: {address.estado}</p>
                      <p>Pais: {address.pais}</p>
                    </div>
                    <div className="btns-container">
                      <Link
                        to={`/address/${address.id}`}
                        className="edit-address-btn"
                      >
                        Editar
                      </Link>
                      <DeleteAddress id={address.id} />
                    </div>
                  </div>
                </li>
              ))
            :
            <li className="col-12 list-group-item border-0 my-3">
              <p className="no-address-tittle">No hay direcciones disponibles</p>
            </li>
          }
          <button type="button" className="home-add-address-btn" onClick={newAddressBtn}>Agregar Direcciones</button>
        </ul>
      </div>
    </div>
  );
};

export default HomePage; 