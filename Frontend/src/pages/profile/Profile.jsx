import React from 'react';
import './profile.scss';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Posts from '../../components/posts/Posts';
import AxiosInstance from '../../api/AxiosInstance';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
// import { Cookies } from 'react-cookie';

const Profile = () => {
  // const cookies = new Cookies();
  // const token = cookies.get('accessToken');

  const { userId } = useParams();

  const fetchUser = async () => {
    try {
      const res = await AxiosInstance.get(`/users/${userId}`);
      console.log('res.data.data >>>', res.data.data);
      return res.data.data;
    } catch (error) {
      throw new Error('Failed to fetch a user');
    }
  };

  const { data: user, error, isError, isLoading } = useQuery('user', fetchUser);

  if (isLoading) return 'Loading...';

  if (isError) return 'An error has occurred: ' + error.message;

  return (
    <section className='social__profile'>
      <div className='social_profile-images'>
        <img
          src={
            user?.coverPic ||
            'https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          }
          alt='coverImage'
          className='cover'
        />
        <img
          src={
            user?.profilePic ||
            'https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'
          }
          alt='profileImage'
          className='profile'
        />
      </div>
      <div className='social__profile-info'>
        <div className='left'>
          <a href='http://facebook.com'>
            <FacebookTwoToneIcon fontSize='medium' />
          </a>
          <a href='http://facebook.com'>
            <InstagramIcon fontSize='medium' />
          </a>
          <a href='http://facebook.com'>
            <TwitterIcon fontSize='medium' />
          </a>
          <a href='http://facebook.com'>
            <LinkedInIcon fontSize='medium' />
          </a>
          <a href='http://facebook.com'>
            <PinterestIcon fontSize='medium' />
          </a>
        </div>
        <div className='center'>
          <span>{user?.username}</span>
          <div className='info'>
            <div className='item'>
              <PlaceIcon />
              <span>{user?.city || 'USA'}</span>
            </div>
            <div className='item'>
              <LanguageIcon />
              <span>{user?.email}</span>
            </div>
          </div>
          <button>follow</button>
        </div>
        <div className='right'>
          <EmailOutlinedIcon />
          <MoreVertIcon />
        </div>
      </div>
    </section>
  );
};

export default Profile;
