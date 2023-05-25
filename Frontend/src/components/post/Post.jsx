import React from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  return (
    <div className='container'>
      <div className='user'>
        <div className='userInfo'>
          <img src={post.profilePic} alt='profilePic' />
          <div className='details'>
            <Link
              to={`/profile/${post.userId}`}
              style={{ textDecoration: 'none', color: 'inherit' }}>
              <span className='name'>{post.name}</span>
            </Link>
            <span className='date'>1 min ago</span>
          </div>
        </div>
        <MoreHorizIcon />
      </div>
      <div className='content'>
        <p className='desc'>{post.desc}</p>
        <img src={post.img} alt='image' />
      </div>
      <div className='infoPost'>
        <div className='item'>
          <FavoriteBorderOutlinedIcon />
          12 Likes
        </div>
        <div className='item'>
          <TextsmsOutlinedIcon />
          12 Comments
        </div>
        <div className='item'>
          <ShareOutlinedIcon />
          Share
        </div>
      </div>
    </div>
  );
};

export default Post;
