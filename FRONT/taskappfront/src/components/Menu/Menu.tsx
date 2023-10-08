// Menu.tsx
import React, { useEffect, useState } from 'react';
import './Menu.scss';
import menuIcon from '../../assets/icons/Menu.svg';
import closeIcon from '../../assets/icons/CloseIcon.svg';
import { getUserAvatar } from '../../utils/AvatarLoader/AvatarLoader';
import Tooltip from '../Tooltip/Tooltip';

interface MenuItem {
  label: string;
  action: (...args:any[]) => void
}

interface MenuProps {
  mainIcon: string;
  menuItems: MenuItem[];
}

const Menu: React.FC<MenuProps> = ({ mainIcon, menuItems }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="topMenu">
      <div className='topMenu__logoContainer'>
        <img src={getUserAvatar(localStorage.getItem('userAvatar'))} alt="user-image" className='topMenu__logo'></img>
        <Tooltip position='right' type='main'>
          <p>En un lugar de la mancha...</p>
        </Tooltip>
      </div>
      <div className='topMenu__buttonContainer'>
        <img src={menuIcon} className="topMenu__button" onClick={toggleMenu}/>
      </div>
      {menuOpen && 
        <div className='sideMenu'>
          <div className='sideMenu__buttonContainer'>
            <img src={closeIcon} className="sideMenu__button" onClick={toggleMenu}/>
          </div>
          <div className="sideMenu__imageContainer">
            <img src={getUserAvatar(localStorage.getItem('userAvatar'))} alt="user-image" className='sideMenu__image'></img>
          </div>
          <div className="sideMenu__optionContainer">
            {menuItems.map((item:MenuItem) => (
              <div className="sideMenu__option" onClick={item.action}>{item.label}</div>
            ))}
          </div>
        </div>
      }
    </div>
  );
};

export default Menu;
