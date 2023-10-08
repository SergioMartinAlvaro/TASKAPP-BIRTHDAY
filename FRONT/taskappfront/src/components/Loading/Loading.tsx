import React, { FC } from 'react';
import './Loading.scss';

export interface ILoading {
    image: string,
    text: string
}

const Loading:FC<ILoading> = ({image, text}) => {
  return (
    <div className='loading'>
        <div className='loading__imageContainer'>
            <img src={image} alt="loading-image" className="loading__image" />
        </div>
        <div className='loading__messageContainer'>
            <h3 className='loading__message'>{text}</h3>
        </div>
    </div>
  )
}

export default Loading