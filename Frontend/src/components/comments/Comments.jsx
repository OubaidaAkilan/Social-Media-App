import React, { useContext, useState } from 'react';
import './comments.scss';
import AxiosInstance from '../../api/AxiosInstance.js';
import { Cookies } from 'react-cookie';
import { AuthContext } from '../../context/AuthContext';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const Comments = ({ post }) => {
  const { currentUser } = useContext(AuthContext);

  const cookies = new Cookies();

  const token = cookies.get('accessToken');

  //===Get Comments

  const fetchComment = async () => {
    try {
      const response = await AxiosInstance.get(`/post/${post._id}/comments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      throw new Error('Failed to fetch comments');
    }
  };

  const {
    data: comments,
    error,
    isError,
    isLoading,
  } = useQuery('comments', fetchComment);

  //====Create Comment

  const createComment = async (body) => {
    try {
      const response = await AxiosInstance.post(
        `/post/${post._id}/comments`,
        {
          desc: body.desc,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      throw new Error('Failed to fetch Comments');
    }
  };

  const [desc, setDesc] = useState('');

  // Access the client
  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation(
    (commentInfo) => {
      return createComment(commentInfo);
    },

    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('comments');
      },
    }
  );

  if (isLoading) return 'Loading...';

  if (isError) return 'An error has occurred: ' + error.message;

  const handleComment = async (e) => {
    e.preventDefault();

    try {
      mutation.mutate({
        desc,
      });
      setDesc('');
    } catch (error) {
      console.error(error);
      // Handle the error appropriately
    }
  };

  return (
    <div className='social__comments'>
      <div className='social__comments-write'>
        <img src={currentUser?.profilePic} alt='profilePicture' />
        <input
          type='text'
          placeholder='Writ a comment'
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleComment}>Send</button>
      </div>
      {comments.map((comment, idx) => {
        return (
          <div className='social_comments-comment' key={idx}>
            <img src={comment?.user?.profilePic} alt='profilePicture' />
            <div className='commentInfo'>
              <span>{comment?.user?.username}</span>
              <p>{comment?.desc}</p>
            </div>
            <div className='commentDate'>1 hour ago</div>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;

// const commentsArr = [
//   {
//     id: 1,
//     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam',
//     name: 'John Doe',
//     userId: 1,
//     profilePicture:
//       'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//   },
//   {
//     id: 2,
//     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam',
//     name: 'Jane Doe',
//     userId: 2,
//     profilePicture:
//       'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
//   },
// ];
