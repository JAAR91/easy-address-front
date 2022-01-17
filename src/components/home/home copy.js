import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addressFetch } from '../../redux/address/address';
import DeleteAddress from '../addresses/deleteAddress';
import "./home.css"

const HomePage = () => {
  const { addresses } = useSelector((state) => state);
  const dispatch = useDispatch();
  const loadAddresses = bindActionCreators(addressFetch, dispatch);

  useEffect(() => {
    loadAddresses();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="home-container">
      <div className="container">
        <ul className="addresses-container">
          {
            (addresses.length > 0) ?
              addresses.map((address) => (
                <li key={address.id} className="address-container">
                  <div>
                    <div className="address-part">
                      <p>Colonia: {address.colonia}</p>
                      <p>Ext #: {address.ext_number}</p>
                      <p>Int #: {address.int_number}</p>
                      <p>Calle: {address.calle}</p>
                    </div>
                    <div className="address-part">
                      <p>Municipio: {address.municipio}</p>
                      <p>Codigo Postal: {address.postal_code}</p>
                      <p>Estado: {address.estado}</p>
                      <p>Pais: {address.pais}</p>
                    </div>
                  </div>
                  <div>
                      <button className="edit-address-btn">Edit</button>
                      <DeleteAddress id={address.id} />
                    </div>
                </li>
              ))
            :
            <li className="address-container">
              <p className="no-address-tittle">No hay direcciones disponibles</p>
            </li>
          }
          <li className="address-container">
              <button type="button" className="home-add-address-btn">Agregar Direcciones</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;