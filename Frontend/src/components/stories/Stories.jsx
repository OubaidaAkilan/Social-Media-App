import React, { useContext } from 'react';
import './stories.scss';
import { AuthContext } from '../../context/AuthContext';
const Stories = () => {
  //TEMPORARY
  const storiesArr = [
    {
      id: 1,
      name: 'John Doe',
      img: 'https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    },
    {
      id: 2,
      name: 'John Doe',
      img: 'https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    },
    {
      id: 3,
      name: 'John Doe',
      img: 'https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    },
    {
      id: 4,
      name: 'John Doe',
      img: 'https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    },
  ];

  const { currentUser } = useContext(AuthContext);
  return (
    <section className='social__stories'>
      <div className='social__stories-story' >
        <img src={currentUser.profilePic} alt='profilPic' />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {storiesArr.map((story, index) => {
        return (
          <div className='social__stories-story' key={index}>
            <img src={story.img} alt='story.img' />
            <span>{story.name}</span>
          </div>
        );
      })}
    </section>
  );
};

export default Stories;
