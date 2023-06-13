import React from 'react';
import './rightBar.scss';
import profileImage from '../../assets/login.jpeg';

const RightBar = () => {
  return (
    <section className='social__rightBar'>
      <div className='social__rightBar-suggestion'>
        <div className='item'>
          <span>Suggestion for you</span>
          {Array.from({ length: 2 }, (v,i) => (
            <div className='user' key={i}>
              <div className='userInfo'>
                <img src={profileImage} alt='userImge' />
                <span>Jane Doe</span>
              </div>
              <div className='buttons'>
                <button>follow</button>
                <button>dismiss</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Last Activites */}
      <div className='social__rightBar-lastActivites'>
        <div className='item'>
          <span>Last activites</span>

          <div className='user'>
            <div className='userInfo'>
              <img src={profileImage} alt='userImge' />
              <p>
                <span>Jane Doe</span> change the ...
              </p>
            </div>
            <span>1 min ago</span>
          </div>

          <div className='user'>
            <div className='userInfo'>
              <img src={profileImage} alt='userImge' />
              <p>
                <span>Jane Doe</span> liked a post
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className='user'>
            <div className='userInfo'>
              <img src={profileImage} alt='userImge' />
              <p>
                <span>Jane Doe</span> liked a post
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
      </div>
      {/* Online friends */}
      <div className='social__rightBar-onlineFriends'>
        <div className='item'>
          <span>Online friends</span>
          {Array.from({ length: 8 }, (v, i) => (
            <div className='user' key={i}>
              <div className='userInfo'>
                <img src={profileImage} alt='userImge' />
                <div className='online' />
                <span>Jane Doe</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightBar;
