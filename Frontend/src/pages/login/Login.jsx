import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import { AuthContext } from '../../context/AuthContext';
const Login = () => {
  const navigate = useNavigate();
  const { login, currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const [err, setErr] = useState(null);
  const handleLogin = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      await login(inputs);
      setIsLoading(false);
    } catch (error) {
      setErr(error.response.data.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className='social__login'>
      <div className='card'>
        <div className='left'>
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to='/register'>
            <button>Register</button>
          </Link>
        </div>
        <div className='right'>
          <h1>Login</h1>
          <form>
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
            {err && <p>{err}</p>}
            <button onClick={handleLogin} disabled={isLoading}>
              {isLoading ? 'loading ....' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
