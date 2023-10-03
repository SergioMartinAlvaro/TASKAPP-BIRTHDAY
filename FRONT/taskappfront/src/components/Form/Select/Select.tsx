import React, { ChangeEvent } from 'react';
import './Select.scss'

interface SelectProps {
  options: string[];
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ options, value, onChange }) => {
  return (
    <select value={value} onChange={onChange} className='select__default'>
      {options.map((option, index) => (
        <option key={index} value={option} className='select__option'>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;