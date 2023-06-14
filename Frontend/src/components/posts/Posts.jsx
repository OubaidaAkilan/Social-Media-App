// import {  } from 'react';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import AxiosInstance from '../../api/AxiosInstance.js';
import { Cookies } from 'react-cookie';
import './posts.scss';
import Post from '../post/Post';
const Posts = () => {
  const cookies = new Cookies();
  const token = cookies.get('accessToken');

  const fetchPost = async () => {
    try {
      const response = await AxiosInstance.get('/post', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      throw new Error('Failed to fetch posts');
    }
  };

  const {
    data: posts,
    error,
    isError,
    isLoading,
  } = useQuery('posts', fetchPost);

  if (isLoading) return 'Loading...';

  if (isError) return 'An error has occurred: ' + error.message;

  return (
    <section className='social__posts'>
      {posts?.map((post, idx) => {
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

//========Use effect and state hooks
// const [isLoading, setIsLoading] = useState(false);

// const [data, setData] = useState(null);

// useEffect(() => {
//   setIsLoading(true);
//   fetchPost();

//   setIsLoading(false);
// }, []);

//TEMPORARY
// const posts = [
//   {
//     id: 1,
//     name: 'John Doe',
//     userId: 1,
//     profilePic:
//       'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
//     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
//     img: 'https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600',
//   },
//   {
//     id: 2,
//     name: 'Jane Doe',
//     userId: 2,
//     profilePic:
//       'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
//     desc: 'Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.',
//   },

//   {
//     id: 3,
//     name: 'Jane Doe',
//     userId: 2,
//     profilePic:
//       'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
//     desc: 'Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.',
//   },
// ];
