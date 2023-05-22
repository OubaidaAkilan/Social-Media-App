import React from 'react';
import { Link } from 'react-router-dom';
import './home.scss';
const Home = () => {
  return (
    <>
      <section className='social__home'>
        <Link to='/register'>
          <button>Home</button>
        </Link>
      </section>
    </>
  );
};

export default Home;
