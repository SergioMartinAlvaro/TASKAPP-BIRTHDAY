import React, { FC, useState } from 'react';
import './Alert.scss';
import AiOutlineCheckCircle from '../../assets/icons/Alert/info.svg';
import AiOutlineWarning from '../../assets/icons/Alert/error.svg';
import { AiOutlineCloseCircle } from 'react-icons/ai';

// Enumeración para tipos de alerta
export enum AlertType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
}

interface AlertProps {
  type: AlertType;
  message: string;
}

const Alert: FC<AlertProps> = ({ type, message }) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div className={`alert ${type} ${visible ? 'fade-in' : ''}`}>
      {type === AlertType.Success && <img src={AiOutlineCheckCircle} alt="Success Icon" />}
      {type === AlertType.Error && <AiOutlineCloseCircle />}
      {type === AlertType.Warning && <img src={AiOutlineWarning} alt="Success Icon" />}

      <p>{message}</p>
      <button onClick={handleClose}>&times;</button>
    </div>
  );
};

export default Alert;