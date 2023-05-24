import React from 'react';
import { Link } from 'react-router-dom';
import './home.scss';
import Stories from '../../components/stories/Stories';
const Home = () => {
  return (
    <>
      <section className='social__home'>
        <Stories />
        <Link to='/register'>
          <button>Home</button>
        </Link>
      </section>
    </>
  );
};

export default Home;
