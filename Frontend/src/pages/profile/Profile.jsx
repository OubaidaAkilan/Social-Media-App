import React, { useState, useContext } from 'react';
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
import AxiosInstance from '../../api/AxiosInstance';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {
  const cookies = new Cookies();
  const token = cookies.get('accessToken');
  const { currentUser } = useContext(AuthContext);

  const [stateFollow, setStateFollow] = useState(null);

  // Access the client
  const queryClient = useQueryClient();

  //======== User

  const { userId } = useParams();

  const [proccess, setProccess] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await AxiosInstance.get(`/users/${userId}`);
      return res.data.data;
    } catch (error) {
      throw new Error('Failed to fetch a user');
    }
  };

  const { data: user, error, isError, isLoading } = useQuery('user', fetchUser);

  //======== Follower
  const fetchFollowers = async () => {
    try {
      const res = await AxiosInstance.get(`/follower/${userId}/followers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.data);
      setStateFollow(res.data.data.includes(currentUser._id));
      return res.data.data;
    } catch (error) {
      throw new Error('Failed to fetch a user');
    }
  };

  const {
    data: followers,
    errorFollowers,
    isErrorFollowers,
    isLoadingFollowers,
  } = useQuery('followers', fetchFollowers);

  const handleFollow = async () => {
    try {
      await AxiosInstance.post(
        `/follower/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProccess(false);
    } catch (error) {
      throw new Error('Failed to follow');
    }
  };

  const handleUnFollow = async () => {
    try {
      await AxiosInstance.delete(`/follower/${userId}/unfollow`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProccess(false);
    } catch (error) {
      throw new Error('Failed to follow');
    }
  };

  // Mutations
  const mutation = useMutation(
    (stateFollower) => {
      if (stateFollower) return handleUnFollow();
      return handleFollow();
    },

    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['followers']);
      },
    }
  );

  const handleFollower = async (e) => {
    e.preventDefault();
    setProccess(true);

    try {
      mutation.mutate(followers.includes(currentUser._id));
    } catch (error) {
      console.error(error);
      // Handle the error appropriately
    }
  };

  if (isLoadingFollowers) return 'Loading follower...';

  if (isErrorFollowers)
    return 'An error has occurred: ' + errorFollowers.message;

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
          {stateFollow ? (
            <button onClick={handleFollower} disabled={proccess}>
              {proccess ? 'proccess ...' : 'unfollwow'}
            </button>
          ) : (
            <button onClick={handleFollower} disabled={proccess}>
              {proccess ? 'proccess ...' : 'follow'}
            </button>
          )}
        </div>
        <div className='right'>
          <EmailOutlinedIcon  />
          <MoreVertIcon  />
        </div>
      </div>
    </section>
  );
};

export default Profile;
