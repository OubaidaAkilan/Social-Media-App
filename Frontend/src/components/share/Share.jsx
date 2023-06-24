import React, { useContext, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { AuthContext } from '../../context/AuthContext';
import { ModalContext } from '../../context/ModalContext';

import AxiosInstance from '../../api/AxiosInstance.js';
import { Cookies } from 'react-cookie';
import axios from 'axios';

import './share.scss';

const Share = () => {
  const { currentUser, loggedIn } = useContext(AuthContext);

  const { setOpenModal } = useContext(ModalContext);

  const cookies = new Cookies();

  const token = cookies.get('accessToken');

  const createPost = async (body) => {
    try {
      const response = await AxiosInstance.post(
        '/post',
        {
          desc: body?.desc,
          imgPost: body?.imgPost || '',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      throw new Error('Failed to fetch posts');
    }
  };

  // Access the client
  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation(
    (postInfo) => {
      return createPost(postInfo);
    },

    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('posts');
      },
    }
  );

  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState('');

  const fileUploadHandler = async () => {
    if (file) {
      try {
        const fd = new FormData();
        fd.append('file', file, file.name);
        const res = await axios.post(
          'http://localhost:3000/api/v1/upload',
          fd,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return res.data;
      } catch (error) {
        throw new Error('Failed to upload Image');
      }
    }
  };

  const handleShare = async (e) => {
    e.preventDefault();
    if (!loggedIn) {
      setOpenModal(true);
      return;
    }
    let imageUrl = '';
    try {
      if (file) {
        imageUrl = await fileUploadHandler();
      }
      mutation.mutate({
        desc,
        imgPost: imageUrl,
      });
      setDesc('');
      setFile(null);
    } catch (error) {
      console.error(error);
      // Handle the error appropriately
    }
  };

  return (
    <div className='social__share'>
      <div className='social__share-postInputs'>
        <img
          src={`/imagesUpload/${currentUser?.profilePic}`}
          alt='free profile'
        />
        <textarea
          name='post_desc'
          placeholder={`What's on your mind ${currentUser?.name}`}
          onChange={(e) => setDesc(e.target.value)}></textarea>
      </div>
      {file && (
        <img
          className='social__share-file'
          src={URL.createObjectURL(file)}
          alt='post'
        />
      )}
      <hr />
      <div className='social__share-postButtons'>
        <div className='infoButtons'>
          <input
            type='file'
            id='file'
            style={{ display: 'none' }}
            onChange={(e) => {
              e.preventDefault();
              setFile(e.target.files[0]);
            }}
          />
          <label htmlFor='file'>
            Add File
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='#868e96'
              className='w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
              />
            </svg>
          </label>
          <button>
            Add Place
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#228be6'
              className='w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25'
              />
            </svg>
          </button>
          <button>
            Tag Friends
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='#fab005'
              className='w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 6h.008v.008H6V6z'
              />
            </svg>
          </button>
        </div>
        <button className='share-btn' onClick={handleShare}>
          Share
        </button>
      </div>
    </div>
  );
};

export default Share;
