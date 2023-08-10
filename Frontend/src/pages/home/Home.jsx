import React, { useContext } from 'react';

import './home.scss';
import Stories from '../../components/stories/Stories.jsx';
import Posts from '../../components/posts/Posts.jsx';
import Share from '../../components/share/Share.jsx';

import { LoadMoreItemsContext } from '../../context/LoadMoreItemsContext';

const Home = () => {
  const { noOfPage, setNoOfPage, loading, setLoading } =
    useContext(LoadMoreItemsContext);

  const handleLoadMoreBtn = () => {
    setLoading(true);

    setNoOfPage(noOfPage + 1);
  };

  return (
    <>
      <section className='social__home'>
        <Stories />
        <Share />
        <Posts />
        <button
          style={{ padding: '3px 6px' }}
          onClick={handleLoadMoreBtn}
          disabled={loading}>
          {loading ? `wait ...` : `load more ...`}
        </button>
      </section>
    </>
  );
};

export default Home;
