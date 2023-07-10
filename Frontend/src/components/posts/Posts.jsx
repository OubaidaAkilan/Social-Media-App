import React, { useContext, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import AxiosInstance from '../../api/AxiosInstance.js';
import { Cookies } from 'react-cookie';
import './posts.scss';
import Post from '../post/Post';
import PostSkeleton from '../post/PostSkeleton.jsx';

import { LoadMoreItemsContext } from '../../context/LoadMoreItemsContext.js';

const Posts = () => {
  const cookies = new Cookies();

  const token = cookies.get('accessToken');

  const { noOfPage, setLoading } = useContext(LoadMoreItemsContext);

  const [loadedData, setLoadedData] = useState([]);

  const fetchPost = async () => {
    try {
      const response = await AxiosInstance.get(`/post?page=${noOfPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (noOfPage !== 1) {
        setLoading(false);
      } else {
        setLoadedData(response.data.data);
        return;
      }

      let posts = response.data.data;

      setLoadedData([...loadedData, ...posts]);

      return posts;
    } catch (error) {
      throw new Error('Failed to fetch posts');
    }
  };

  const {
    data: posts,
    error,
    isError,
    isLoading,
  } = useQuery(['posts', noOfPage], fetchPost);

  // useEffect(() => {
  //   // setLoadedData([...loadedData]);
  // }, [posts]);

  if (isLoading) return <PostSkeleton />;

  if (isError)
    return (
      <div className='error-container'>
        <h2 className='error-title'>Error:{error.message}</h2>
        <p className='error-message'>
          We apologize for the inconvenience. There seems to be an issue
          retrieving the posts at the moment. Please check your internet
          connection and try again later.
        </p>
      </div>
    );

  return (
    <section className='social__posts'>
      {loadedData?.map((post, idx) => {
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
