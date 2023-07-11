import React from 'react';

import './deletePostModal.scss';

const DeletePostModal = ({ isDeleting }) => {
  return (
    <div className='delete-post-modal'>
      {isDeleting ? (
        <div className='loader-spinner'>
          <div className='spinner'></div>
        </div>
      ) : (
        <div className='message'>The post is deleted</div>
      )}
    </div>
  );
};

export default DeletePostModal;
