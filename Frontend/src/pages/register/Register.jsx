import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AxiosInstance from '../../api/AxiosInstance.js';
import { ModalContext } from '../../context/ModalContext';
import './register.scss';

const Register = () => {
  const { setOpenModal } = useContext(ModalContext);

  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    setOpenModal(false);
    return () => {
      // Cleanup operations here
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRegister = async (e) => {
    setIsLoading(true);

    e.preventDefault();

    if (
      !(
        inputs.email.length &&
        inputs.password.length &&
        inputs.username.length &&
        inputs.name.length
      )
    ) {
      setErr('All fields are required');

      setIsLoading(false);

      return;
    }

    try {
      
      await AxiosInstance.post('/account/register', inputs);

      setIsLoading(false);
    } catch (error) {
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
            <button onClick={handleRegister} disabled={isLoading}>
              {isLoading ? 'loading ....' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
