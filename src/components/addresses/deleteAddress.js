import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DeleteConfirmation from './deleteConfirmation';

const DeleteAddress = (props) => {
  const { id } = props;
  const [ windowStatus, setWindowStatus ] = useState(false);
 
  return (
    <>
      <button
        type="button"
        className="del-address-btn"
        onClick={() => setWindowStatus(true)}
      >
        Borrar
      </button>
      {
        windowStatus ?
          <DeleteConfirmation id={id} setWindowStatus={setWindowStatus} />
        :
          <div />
      }
    </>
  );
};

DeleteAddress.propTypes = { id: PropTypes.number.isRequired };

export default DeleteAddress;