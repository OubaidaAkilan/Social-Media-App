import React, { useState } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';

const Post = ({ post }) => {
const [liked, setLiked] = useState(true);

  const [openComment, setOpenComment] = useState(false);
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
        <MoreHorizIcon />
      </div>
      <div className='content'>
        <p className='desc'>{post?.desc}</p>
        {console.log(post?.imgPost)}
        <img src={'./imagesUpload/' + post?.imgPost} alt='img-Post' />
      </div>
      <div className='infoPost'>
        <div className='item'>
          {liked ? (
            <FavoriteOutlinedIcon style={{ color: 'red' }} />
          ) : (
            <FavoriteBorderOutlinedIcon />
          )}
          12 Likes
        </div>
        <div
          className='item'
          onClick={() => {
            setOpenComment(!openComment);
          }}>
          <TextsmsOutlinedIcon />
          12 Comments
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
