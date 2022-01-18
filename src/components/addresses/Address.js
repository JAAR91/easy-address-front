import React, { useEffect } from 'react';
import AddressForm from './addressForm';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addressFetch } from '../../redux/address/address';

const Address = () => {
  const dispatch = useDispatch();
  const loadAddresses = bindActionCreators(addressFetch, dispatch);

  useEffect(() => {
    loadAddresses();
    // eslint-disable-next-line
  }, []);

  const { id } = useParams();
  const { addresses } = useSelector((state) => state);

  const data = (
    (id === "new" || id === "") ?
      { 
        id: undefined,
        colonia: "",
        ext_number: undefined,
        int_number: undefined,
        calle:"",
        municipio:"",
        postal_code: undefined,
        estado:"", pais:"" 
      }
    : 
    addresses.find((address) => address.id.toString() === id)
  );
  const newAddress = (
    (id === "new" || id === "") ?
      true
    :
      false
  );
  return (
    <div className="address-page-container">
      <div className='container'>
        <AddressForm data={data} newAddress={newAddress} />
      </div>
    </div>
  );
};

export default Address;