import React from 'react';

import { Link } from 'react-router-dom';
import './home.scss';
import Stories from '../../components/stories/Stories.jsx';
import Posts from '../../components/posts/Posts.jsx';
import Share from '../../components/share/Share.jsx';


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
