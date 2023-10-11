import React, { ChangeEvent } from 'react';
import './Select.scss'
import { IOptionSelect } from '../Form';

interface SelectProps {
  options: IOptionSelect[];
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ options, value, onChange }) => {
  return (
    <select value={value} onChange={onChange} className='select__default'>
      {options.map((option, index) => (
        <option key={index} value={option.id} className='select__option'>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default Select;