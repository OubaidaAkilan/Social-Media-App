import React from 'react';
import { Link } from 'react-router-dom';
import './home.scss';
import Stories from '../../components/stories/Stories';
import Posts from '../../components/posts/Posts';

const Home = () => {
  return (
    <>
      <section className='social__home'>
        <Stories />
        <Posts />
        <Link to='/register'>
          <button>Home</button>
        </Link>
      </section>
    </>
  );
};

export default Home;
