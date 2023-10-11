import React, { ChangeEvent } from 'react';
import './Input.scss';

interface InputProps {
  label: string;
  type?: string;
  value?: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, placeholder, type = 'text', value, onChange }) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <input
        className='input__default'
        type={type}
        placeholder={placeholder}
        value={value || ''}  // Utiliza el valor proporcionado o una cadena vacía si es nulo o indefinido
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
