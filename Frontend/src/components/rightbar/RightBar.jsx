import React from 'react';
import './rightBar.scss';
import profileImage from '../../assets/login.jpeg';
import { blue } from '@mui/material/colors';

const RightBar = () => {
  return (
    <section className='social__rightBar'>
      <div className='social__rightBar-container'>
        <div className='item'>
          <span>Suggestion for you</span>
          <div className='user'>
            <div className='userInfo'>
              <img src={profileImage} alt='userImge' />
              <span>Jane Doe</span>
            </div>
            <div className='buttons'>
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightBar;
