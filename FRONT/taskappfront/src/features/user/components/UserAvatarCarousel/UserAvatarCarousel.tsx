import React, { useState } from 'react';
import './UserAvatarCarousel.scss'; // Asegúrate de tener tu archivo de estilos
import leftArrow from '../../../../assets/icons/leftArrow.svg';
import rightArrow from '../../../../assets/icons/rightArrow.svg';
const UserAvatarCarousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
    localStorage.setItem('userAvatar', `${currentImageIndex}`);
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
    localStorage.setItem('userAvatar', `${currentImageIndex}`);
  };

  return (
    <div className="userAvatarCarousel">
    <button onClick={handlePrev} className="userAvatarCarousel__button userAvatarCarousel__button--left">
    <img src={leftArrow} alt="Flecha Izquierda" />
      </button>
      <div className="userAvatarCarousel__slide">
        <img className="userAvatarCarousel__image" src={images[currentImageIndex]} alt={`avatar-user-${currentImageIndex}`} />
      </div>
      <button onClick={handleNext} className="userAvatarCarousel__button userAvatarCarousel__button--right">
      <img src={rightArrow} alt="Flecha Derecha" />
      </button>
    </div>
  );
};

export default UserAvatarCarousel;