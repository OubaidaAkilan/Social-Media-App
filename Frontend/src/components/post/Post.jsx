import React, { useState, useContext } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments.jsx';
import { ModalContext } from '../../context/ModalContext';

import { AuthContext } from '../../context/AuthContext';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Cookies } from 'react-cookie';
import AxiosInstance from '../../api/AxiosInstance.js';

const Post = ({ post }) => {
  const { currentUser, loggedIn } = useContext(AuthContext);

  const { setOpenModal } = useContext(ModalContext);

  const cookies = new Cookies();

  const token = cookies.get('accessToken');

  const [liked, setLiked] = useState(null);

  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  //===Get Likes

  const fetchLikes = async (postId) => {
    try {
      const response = await AxiosInstance.get(
        `/like?postId=` + postId,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log('response.data.data', response.data.data);
      setLiked(response.data.data.includes(currentUser._id));
      return response.data.data;
    } catch (error) {
      throw new Error('Failed to fetch comments');
    }
  };

  const {
    data: likes,
    error,
    isError,
    isLoading,
  } = useQuery(['likes', post._id], () => {
    return fetchLikes(post._id);
  });

  const addLike = async () => {
    try {
      const response = await AxiosInstance.post(
        `/like`,
        {
          postId: post._id,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.data;
    } catch (error) {
      throw new Error('Failed to Add Like');
    }
  };

  const deleteLike = async () => {
    try {
      const response = await AxiosInstance.delete(
        `/like?postId=` + post._id,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.data;
    } catch (error) {
      throw new Error('Failed to delete like');
    }
  };

  // Access the client
  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation(
    (liked) => {
      if (liked) return deleteLike();
      return addLike();
    },

    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['likes']);
      },
    }
  );

  const handleLike = async (e) => {
    e.preventDefault();
    if (!loggedIn) {
      setOpenModal(true);
      return;
    }
    try {
      setLiked(!liked);
      mutation.mutate(likes.includes(currentUser._id));
    } catch (error) {
      console.error(error);
      // Handle the error appropriately
    }
  };

  const [openComment, setOpenComment] = useState(false);

  if (isLoading) return 'Loading...';

  if (isError) return 'An error has occurred: ' + error.message;

  return (
    <div className='container'>
      <div className='user'>
        <div className='userInfo'>
          <img src={post?.profilePic} alt='profilePic' />
          <div className='details'>
            <Link
              to={`/profile/${post?.userId}`}
              style={{ textDecoration: 'none', color: 'inherit' }}>
              <span className='name'>{post?.name}</span>
            </Link>
            <span className='date'>1 min ago</span>
          </div>
        </div>
        <div className='delete_post'>
          <MoreHorizIcon
            className='delete_post-icon'
            onClick={() => setShowDeleteBtn(!showDeleteBtn)}
          />
          <button
            onClick={() => setShowDeleteBtn(!showDeleteBtn)}
            className={`delete_post-btn ${
              showDeleteBtn ? 'show_post-btn' : ''
            }`}>
            Delete Post
          </button>
        </div>
      </div>
      <div className='content'>
        <p className='desc'>{post?.desc}</p>
        {/* {console.log(post?.imgPost)} */}
        <img src={'./imagesUpload/' + post?.imgPost} alt='img-Post' />
      </div>
      <div className='infoPost'>
        <div className='item'>
          {liked ? (
            <FavoriteOutlinedIcon
              style={{ color: 'red' }}
              onClick={(e) => {
                handleLike(e);
              }}
            />
          ) : (
            <FavoriteBorderOutlinedIcon
              onClick={(e) => {
                handleLike(e);
              }}
            />
          )}
          {likes.length} Likes
        </div>
        <div
          className='item'
          onClick={() => {
            setOpenComment(!openComment);
          }}>
          <TextsmsOutlinedIcon />
          {post.comments.length} Comments
        </div>
        <div className='item'>
          <ShareOutlinedIcon />
          Share
        </div>
      </div>
      {openComment && <Comments post={post} />}
    </div>
  );
};

export default Post;
