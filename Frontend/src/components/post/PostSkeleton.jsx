import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import React from 'react';

const PostSkeleton = () => {
  return (
    <SkeletonTheme color='#F5F5F5' highlightColor='#ffffff'>
      <div className='container'>
        <Skeleton width={'100%'} height={300} />
      </div>
      <div className='container'>
        <Skeleton width={'100%'} height={300} />
      </div>
      <div className='container'>
        <Skeleton width={'100%'} height={300} />
      </div>
    </SkeletonTheme>
  );
};

export default PostSkeleton;
