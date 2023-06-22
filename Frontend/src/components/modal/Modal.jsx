import React from 'react';
import { Link } from 'react-router-dom';
import './modal.scss'; // Import the SCSS file for styling

const Modal = (props) => {
  const handelClose = (e) => {
    e.preventDefault();
    props.setOpenModal(false);
  };
  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <svg
            onClick={handelClose}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='modal-icon'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
          <h3 className='modal-title'>!😉 يا لطيف انت</h3>
        </div>
        <div className='modal-body'>
          <p>
            استنّى شوي! ليكون بتدور على ثغراتي . فهمتك بدك تمسك علي ممسك عليك
            شغلات بتضحك 🥱؟ 😜
          </p>
        </div>
        <div className='modal-footer'>
          <Link to='/login' className='btn btn-login'>
            🚀 شطور انت سجل دخول
          </Link>
          <p className='register-link'>
            ما عندك حساب لسه 😱 ,شو بتستنى{' '}
            <Link to='/register'>🤣 تسويق ابو الشلن </Link> جرب و🎉 اتسلى
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
