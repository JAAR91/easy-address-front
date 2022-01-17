import React from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { deleteAddressFetch } from '../../redux/address/address';

const DeleteAddress = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const btnAction = bindActionCreators(deleteAddressFetch, dispatch);

  const deleteAddressBtn = () => {
    btnAction(id);
  };

  return (
    <button
      type="button"
      className="del-address-btn"
      onClick={deleteAddressBtn}
    >
      Borrar
    </button>
  );
};
DeleteAddress.propTypes = { id: PropTypes.number.isRequired };

export default DeleteAddress;