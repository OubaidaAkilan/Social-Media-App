import React from 'react';
import { Link } from 'react-router-dom';
import AxiosInstance from '../../api/AxiosInstance.js';

import './register.scss';
import { useState } from 'react';

const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
  });

  const [err, setErr] = useState(null);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await AxiosInstance.post('/register', inputs);
    } catch (error) {
      console.log(error);
      setErr(error.response.data.message);
    }
  };

  return (
    <section className='social__register'>
      <div className='card'>
        <div className='left'>
          <h1>Oubaida Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to='/login'>
            <button>Login</button>
          </Link>
        </div>
        <div className='right'>
          <h1>Register</h1>
          <form>
            <input
              type='text'
              placeholder='Username'
              name='username'
              onChange={handleChange}
            />
            <input
              type='text'
              placeholder='Email'
              name='email'
              onChange={handleChange}
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={handleChange}
            />
            <input
              type='text'
              placeholder='Name'
              name='name'
              onChange={handleChange}
            />
            {err && <p>{err}</p>}
            <button onClick={handleRegister}>Register</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
