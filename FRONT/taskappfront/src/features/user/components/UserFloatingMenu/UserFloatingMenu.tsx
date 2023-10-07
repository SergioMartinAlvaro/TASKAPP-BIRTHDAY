// src/components/FloatingButton.tsx
import React from 'react';
import './UserFloatingButton.scss';
import TrophySVG from '../../../../assets/icons/Trophy.svg';

const UserFloatingButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button className="floating-button" onClick={onClick}>
      <img src={TrophySVG} alt="Trophy Icon" />
    </button>
  );
};

export default UserFloatingButton;
