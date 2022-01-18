import React from 'react';
import PropTypes from 'prop-types';
import './loading.css';

const Loading = (props) => {
  const { status } = props;

  return (
    <div className={`${ status ? "" : "d-none" } loader-container`}>
      <div className="spinner-border text-ligth" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p>Cargando, Por favor espere...</p>
    </div>
  );
};

Loading.propTypes = {
  status: PropTypes.bool.isRequired
};

export default Loading;