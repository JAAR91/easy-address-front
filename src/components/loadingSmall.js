import React from 'react';
import PropTypes from 'prop-types';

const LoadingSmall = (props) => {
  const { status } = props;

  return (
    <div className={`${ status ? "spinner-border text-success" : "d-none"}`} role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
  );
};

LoadingSmall.propTypes = {
  status: PropTypes.bool.isRequired
};

export default LoadingSmall;