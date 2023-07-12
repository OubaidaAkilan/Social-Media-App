import React from 'react';

import './modal.scss';

const Modal = (props) => {
  return (
    <div className='modal'>
      <div className='modal-content'>{props.component}</div>
    </div>
  );
};

export default Modal;
