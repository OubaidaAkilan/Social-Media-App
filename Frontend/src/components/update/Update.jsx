import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import AxiosInstance from '../../api/AxiosInstance.js';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import './update.scss';

const Update = (props) => {
  const cookies = new Cookies();

  const token = cookies.get('accessToken');

  const [inputs, setInputs] = useState({
    username: props.user.username,
    email: props.user.email,
    city: props.user.city || '',
  });

  const [profilePic, setProfilePic] = useState(null);

  const [coverPic, setCoverPic] = useState(null);

  const fileUploadHandler = async (file) => {
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

  const updateUser = async (body) => {
    try {
      const response = await AxiosInstance.put(`/users/${props.userId}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      throw new Error('Failed to fetch posts');
    }
  };

  // Access the client
  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation(
    (userInfo) => {
      return updateUser(userInfo);
    },

    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('users');
      },
    }
  );

  const handleSave = async (e) => {
    e.preventDefault();

    let profilePicUrl = '';
    let coverPicUrl = '';

    try {
      if (profilePic && coverPic) {
        profilePicUrl = await fileUploadHandler(profilePic);
        coverPicUrl = await fileUploadHandler(coverPic);
      }
      mutation.mutate({
        ...inputs,
        coverPic: coverPicUrl,
        profilePic: profilePicUrl,
      });

      setProfilePic(null);
      setCoverPic(null);
    } catch (error) {
      console.error(error);
      // Handle the error appropriately
    }
  };

  const handleChange = (e) => {
    // console.log(inputs);
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handelClose = (e) => {
    e.preventDefault();
    props.setOpenUpdate(false);
  };

  return (
    <div className='social__update update__modal'>
      <svg
        onClick={handelClose}
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='icon'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M6 18L18 6M6 6l12 12'
        />
      </svg>

      <label htmlFor='coverPic'>Cover pic:</label>
      <input
        className='file-input'
        type='file'
        name='coverPic'
        id='coverPic'
        onChange={(e) => {
          e.preventDefault();
          setCoverPic(e.target.files[0]);
        }}
      />
      {coverPic && (
        <img
          className='social__share-file'
          src={URL.createObjectURL(coverPic)}
          alt='coverPic'
        />
      )}
      <label htmlFor='profilePic'>Profile pic:</label>
      <input
        className='file-input'
        type='file'
        name='profilePic'
        id='profilePic'
        onChange={(e) => {
          e.preventDefault();
          setProfilePic(e.target.files[0]);
        }}
      />
      {profilePic && (
        <img
          className='social__share-file'
          src={URL.createObjectURL(profilePic)}
          alt='profilePic'
        />
      )}
      <label htmlFor='username'>Username:</label>
      <input
        className='text-input'
        type='text'
        name='username'
        value={inputs.username}
        onChange={handleChange}
      />

      <label htmlFor='email'>Email:</label>
      <input
        className='text-input'
        type='text'
        name='email'
        value={inputs.email}
        onChange={handleChange}
      />

      <label htmlFor='city'>City:</label>
      <input
        className='text-input'
        type='text'
        name='city'
        value={inputs.city}
        onChange={handleChange}
      />

      <button className='update-button' onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default Update;
