import React from 'react';
import './comments.scss';
const Comments = ({ comment }) => {
  const commentsArr = [
    {
      id: 1,
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam',
      name: 'John Doe',
      userId: 1,
      profilePicture:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 2,
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam',
      name: 'Jane Doe',
      userId: 2,
      profilePicture:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
    },
  ];
  return (
    <div className='social__comments'>
      {commentsArr.map((comment, idx) => {
        return (
          <div className='social_comments-comment'>
            <img src={comment.profilePicture} alt='profile.picture' />
            <div className='commentInfo'>
              <span>{comment.name}</span>
              <p>{comment.desc}</p>
            </div>
            <div className='commentDate'>1 hour ago</div>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
