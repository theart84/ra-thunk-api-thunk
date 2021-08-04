// Core
import React from 'react';

type ErrorPropsType = {
  message: string;
}

const ErrorMessage: React.FC<ErrorPropsType> = ({message}) => {
  return (
    <div className="alert alert-danger text-center" role="alert">{message}</div>
  )
}

// Exports
export default ErrorMessage;
