// src/components/Button/Button.tsx
import React from 'react';
import "./Button.scss"

interface ButtonProps {
  onClick: (...props:any[]) => void;
  text: string;
  buttonType: EButtonType;
  buttonSize: EButtonSize
}

export enum EButtonSize {
    LargeButton = "LargeButton",
    SmallButton = "SmallButon",
}

export enum EButtonType {
  Main = "Main",
  Secondary = "Secondary",
  Blank = "Blank"
}

const Button: React.FC<ButtonProps> = ({ onClick, text, buttonType, buttonSize }) => {
  return (
    <button type="button" onClick={onClick} 
    className={`button button__${buttonSize}--${buttonType}`}>
      {text}
    </button>
  );
};

export default Button;