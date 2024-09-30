import React from 'react';

const ErrorMessage = ({ message }) => {
  return message ? <div className="alert alert-danger">{message}</div> : null;
};

export default ErrorMessage;
