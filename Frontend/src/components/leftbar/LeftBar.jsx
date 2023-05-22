import React from 'react';
import Item from '../item/Item';
import './leftBar.scss';

import profileImage from '../../assets/login.jpeg';
import Friends from '../../assets/1.png';
import Groups from '../../assets/2.png';
import MarketPlace from '../../assets/3.png';
import Watch from '../../assets/4.png';
import Memories from '../../assets/5.png';
import Events from '../../assets/6.png';
import Gaming from '../../assets/7.png';
import Gallery from '../../assets/8.png';
import Videos from '../../assets/9.png';
import Messages from '../../assets/10.png';
import Fundraiser from '../../assets/11.png';
import Tutorials from '../../assets/12.png';
import Courses from '../../assets/13.png';

const LeftBar = () => {
  return (
    <section className='social__leftBar'>
      <div className='container'>
        <div className='user'>
          <Item img={profileImage} title={'Oubaida'} />
        </div>
        <div className='menu user'>
          <Item img={Friends} title={'Friends'} />
          <Item img={Groups} title={'Groups'} />
          <Item img={MarketPlace} title={'MarketPlace'} />
          <Item img={Watch} title={'Watch'} />
          <Item img={Memories} title={'Memories'} />
        </div>
        <hr />
        <div className='menu shortcuts'>
          <span>Shortcuts</span>
          <Item img={Events} title={'Events'} />
          <Item img={Gaming} title={'Gaming'} />
          <Item img={Gallery} title={'Gallery'} />
          <Item img={Videos} title={'Videos'} />
          <Item img={Messages} title={'Messages'} />
        </div>
        <hr />
        <div className='menu others'>
          <span>Others</span>
          <Item img={Fundraiser} title={'Fundraiser'} />
          <Item img={Tutorials} title={'Tutorials'} />
          <Item img={Courses} title={'Courses'} />
        </div>
      </div>
    </section>
  );
};

export default LeftBar;
