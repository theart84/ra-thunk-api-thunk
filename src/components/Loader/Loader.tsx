// Core
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="spinner-border text-primary" role="status" style={{
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto'
    }}>
      <span className="visually-hidden text-center">Загрузка...</span>
    </div>
  )
}

// Exports
export default Loader;
