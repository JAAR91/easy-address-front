import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { deleteAddressFetch } from '../../redux/address/address';
import './address.css';
import Loading from '../loading';

const DeleteConfirmation = (props) => {
  const { id, setWindowStatus } = props;
  const [ loadingStatus, setLoadingStatus ] = useState(false);
  const dispatch = useDispatch();
  const btnAction = bindActionCreators(deleteAddressFetch, dispatch);

  const deleteAddressBtn = () => {
    setLoadingStatus(true);
    setWindowStatus(false);
    btnAction(id, setLoadingStatus);
  };

  return (
    <>
      <div className="confirmation-bg">
        <div className="confirmation-window">
          <p className="text-center">
            Estas seguro que deseas borrar esta direccion?
          </p>
          <div className="d-flex justify-content-around align-items-center">
            <button
              type="button"
              className="yes-btn"
              onClick={deleteAddressBtn}
            >
              Si
            </button>
            <button className="no-btn" onClick={() => setWindowStatus(false)}>No</button>
          </div>
        </div>
      </div>
      <Loading status={loadingStatus} />
    </>
  );
};

DeleteConfirmation.propTypes = { 
  id: PropTypes.number.isRequired,
  setWindowStatus: PropTypes.func.isRequired,
};

export default DeleteConfirmation;