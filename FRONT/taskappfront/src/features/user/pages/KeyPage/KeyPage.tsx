import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../../../store/store';
import './KeyPage.scss';
import allPeeps from '../../../../assets/images/peeps/allPeeps.svg';
import Tooltip from '../../../../components/Tooltip/Tooltip';

const KeyPage = () => {
  const navigate = useNavigate();
  const key = useSelector((state: RootState) => state.keys.keyAssigned);
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if(key[0].assignedTo.id !== user.id) {
      navigate('/')
    }
  }, [])
  return (
    <div className="keyContainer">
      <div className='keyContainer__titleContainer'>
        <h2 className='keyContainer__title'>La llave!</h2>
      </div>
      <div className='keyContainer__textContainer'>
        <Tooltip position='top' type='main'>
          <p className='keyContainer__text'>{key[0].text}</p>
        </Tooltip>
        <img src={allPeeps} alt="all-peeps" className='keyContainer__image' />
      </div>
    </div>
  );
}

export default KeyPage