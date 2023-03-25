import React from 'react';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import userImage from '../../assets/login.jpeg'
import './navbar.scss';
const Navbar = () => {
  return (
    <nav className='social__nav'>
      <div className='social__nav-left'>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <span>Social-Media</span>
        </Link>
        <HomeOutlinedIcon />
        <DarkModeOutlinedIcon />
        <GridViewOutlinedIcon />
        <div className='social__nav-left-search'>
          <SearchOutlinedIcon
            style={{ color: '#555', fontSize: '1rem', marginRight: '0.5rem' }}
          />
          <input type='text' placeholder='Search' />
        </div>
      </div>
      <div className='social__nav-right'>
        <PersonOutlineOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsNoneOutlinedIcon />
        <div className="social__nav-user">
           <img src={userImage} alt="" />
        <span>Oubaida</span>
        </div>
       
      </div>
    </nav>
  );
};

export default Navbar;
