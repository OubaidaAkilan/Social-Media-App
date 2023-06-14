import React from 'react';
import { Link } from 'react-router-dom';
import './home.scss';
import Stories from '../../components/stories/Stories';
import Posts from '../../components/posts/Posts';
import Share from '../../components/share/Share';

const Home = () => {
  return (
    <>
      <section className='social__home'>
        <Stories />
        <Share />
        <Posts />
        <Link to='/register'>
          <button>Home</button>
        </Link>
      </section>
    </>
  );
};

export default Home;
