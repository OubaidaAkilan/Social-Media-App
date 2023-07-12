import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

import { ModalContext } from '../../context/ModalContext';

import './modal.scss';

const AuthModal = () => {
  const { setOpenModal } = useContext(ModalContext);

  return (
    <>
      <div className='modal-header'>
        <svg
          onClick={() => setOpenModal(false)}
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
    </>
  );
};

export default AuthModal;
