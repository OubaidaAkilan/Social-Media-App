import React, { useState } from 'react';
import './update.scss';

const Update = (props) => {
  const [inputs, setInputs] = useState({
    username: props.user.username,
    email: props.user.email,
    city: props.user.city || '',
  });

  const handleChange = (e) => {
    console.log(inputs);
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = (e) => {
    
  };

  const handelClose = (e) => {
    e.preventDefault();
    props.setOpenUpdate(false);
  };

  return (
    <div className='social__update modal'>
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

      <label htmlFor='file1'>Cover pic:</label>
      <input className='file-input' type='file' name='file1' />

      <label htmlFor='file2'>Profile pic:</label>
      <input className='file-input' type='file' name='file2' />

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
