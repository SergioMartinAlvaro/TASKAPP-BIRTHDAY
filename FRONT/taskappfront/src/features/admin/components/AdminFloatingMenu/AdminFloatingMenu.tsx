import React, { useState } from 'react';
import './AdminFloatingButton.scss';
import TrophySVG from '../../../../assets/icons/Trophy.svg';
import FloatingButtonMenu from './Menu/FloatingButtonMenu';

export interface IMenuOptions {
  text: string,
  action: (...args: any[]) => void
}

const AdminFloatingButton: React.FC<{ options: IMenuOptions[] }> = ({ options }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleButtonClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div>
      <button className={`floating-button ${isMenuOpen ? 'open' : ''}`} onClick={handleButtonClick}>
        <img src={TrophySVG} alt="Trophy Icon" />
      </button>
      {isMenuOpen && <FloatingButtonMenu options={options} onClose={handleCloseMenu} />}
    </div>
  );
};
export default AdminFloatingButton;