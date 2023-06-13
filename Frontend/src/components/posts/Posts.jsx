import React from 'react';
import './posts.scss';
import Post from '../post/Post';
const Posts = () => {
  //TEMPORARY
  const posts = [
    {
      id: 1,
      name: 'John Doe',
      userId: 1,
      profilePic:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      img: 'https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600',
    },
    {
      id: 2,
      name: 'Jane Doe',
      userId: 2,
      profilePic:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
      desc: 'Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.',
    },

    {
      id: 3,
      name: 'Jane Doe',
      userId: 2,
      profilePic:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
      desc: 'Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.',
    },
  ];
  return (
    <section className='social__posts'>
      {posts.map((post, idx) => {
        return (
          <div className='social_posts-post' key={idx}>
            <Post post={post} key={idx} />
          </div>
        );
      })}
    </section>
  );
};

export default Posts;
