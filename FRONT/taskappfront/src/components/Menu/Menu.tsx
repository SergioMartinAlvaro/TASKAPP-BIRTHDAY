// Menu.tsx
import React, { useEffect, useState } from 'react';
import './Menu.scss';
import menuIcon from '../../assets/icons/Menu.svg';
import { getUserAvatar } from '../../utils/AvatarLoader/AvatarLoader';

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
      </div>
      <div className='topMenu__buttonContainer'>
        <img src={menuIcon} className="topMenu__button" onClick={toggleMenu}/>
      </div>
    </div>
  );
};

export default Menu;
