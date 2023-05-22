import React from 'react';
import './item.scss';
const Item = ({img, title}) => {
  return (
    <div className='social__leftBar-item'>
      <img src={img} alt='img-none' />
      <span>{title}</span>
    </div>
  );
}

export default Item