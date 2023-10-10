// Menu.tsx
import React, { useEffect, useState } from 'react';
import './Menu.scss';
import menuIcon from '../../assets/icons/Menu.svg';
import closeIcon from '../../assets/icons/CloseIcon.svg';
import { getUserAvatar } from '../../utils/AvatarLoader/AvatarLoader';
import Tooltip from '../Tooltip/Tooltip';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setMenuMessage } from '../../store/userSlice';

interface MenuItem {
  label: string;
  action: (...args:any[]) => void
}

interface MenuProps {
  mainIcon: string;
  menuItems: MenuItem[];
}

const Menu: React.FC<MenuProps> = ({ mainIcon, menuItems }) => {
  const menuMessage = useSelector((state: RootState) => state.user.menuMessage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if(!menuMessage) {
      dispatch(setMenuMessage(`Haz click en mi para volver atrás.`));
    }
    
  }, [])

  useEffect(() => {
    setMessage(menuMessage)
  }, [menuMessage])

  return (
    <div className="topMenu">
      <div className='topMenu__logoContainer'>
        <img src={getUserAvatar(localStorage.getItem('userAvatar'))} alt="user-image" className='topMenu__logo' onClick={() => navigate('/')}></img>
        <Tooltip position='right' type='main'>
          <p>{message}</p>
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
