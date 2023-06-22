import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AvatarImage from '../../assets/avatarImage.jpg';

import './navbar.scss';
import { DarkModeContext } from '../../context/DarkModeContext';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, loggedIn } = useContext(AuthContext);
  return (
    <nav className='social__nav'>
      <div className='social__nav-left'>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <span>Social-Media</span>
        </Link>
        <HomeOutlinedIcon className='social__nav-icons' />
        {darkMode ? (
          <WbSunnyIcon className='social__nav-icons' onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon
            className='social__nav-icons'
            onClick={toggle}
          />
        )}

        <GridViewOutlinedIcon className='social__nav-icons' />
        <div className='social__nav-left-search'>
          <SearchOutlinedIcon
            style={{ color: '#555', fontSize: '1rem', marginRight: '0.5rem' }}
          />
          <input type='text' placeholder='Search' />
        </div>
      </div>
      <div className='social__nav-right'>
        <PersonOutlineOutlinedIcon className='social__nav-icons' />
        <EmailOutlinedIcon className='social__nav-icons' />
        <NotificationsNoneOutlinedIcon className='social__nav-icons' />
        <div className='social__nav-user'>
          {!loggedIn ? (
            <Link to='/login'>
              <span>Login</span>
            </Link>
          ) : (
            <>
              <img
                src={currentUser?.profilePic || AvatarImage}
                alt='profileImage'
              />
              <span>{currentUser?.name}</span>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
