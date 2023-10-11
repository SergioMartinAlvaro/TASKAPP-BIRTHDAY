import React from 'react';
import './FloatingButtonMenu.scss';
import { IMenuOptions } from '../AdminFloatingMenu';

const FloatingButtonMenu: React.FC<{ options: IMenuOptions[]; onClose: () => void }> = ({ options, onClose }) => {
  return (
    <div className="floating-button-menu">
      <div className="close-button" onClick={onClose}>
        &times;
      </div>
      {options.map((option, index) => (
        <div key={index} className="menu-option" onClick={() => option.action()}>
          {option.text}
        </div>
      ))}
    </div>
  );
};

export default FloatingButtonMenu;