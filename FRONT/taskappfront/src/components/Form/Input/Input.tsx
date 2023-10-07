import React, { ChangeEvent } from 'react';
import Label from '../Label/Label';
import './Input.scss'

interface InputProps {
  label: string; // Etiqueta del input
  type?: string; // Tipo del input (por defecto 'text')
  value: string; // Valor del input
  placeholder?: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void; // Función que se ejecutará al cambiar el input
}

const Input: React.FC<InputProps> = ({ label, type = 'text', value, onChange, placeholder }) => {
  return (
    <div>
      {label && <Label text={label}></Label>}
      <input placeholder={placeholder ? placeholder : ''} type={type} value={value} onChange={onChange} className='input__default'/>
    </div>
  );
};

export default Input;