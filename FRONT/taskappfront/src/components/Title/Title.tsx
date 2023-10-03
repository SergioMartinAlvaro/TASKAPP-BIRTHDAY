import React from "react";
import "./Title.scss";

export interface ITitleProps {
  text: string;
  size: ETitleSize;
}

export enum ETitleSize {
  Large = "Large",
  Medium = "Medium",
  Small = "Small",
}

const getTitleSize = (size, title) => {
  switch (size) {
    case ETitleSize.Large:
      return <h1 className={`title title__default--${size}`}>{title}</h1>;
    case ETitleSize.Medium:
      return <h2 className={`title title__default--${size}`}>{title}</h2>;
    case ETitleSize.Small:
      return <h3 className={`title title__default--${size}`}>{title}</h3>;
    default:
  }
};

const Title: React.FC<ITitleProps> = ({ text, size }) => {
  return <>{getTitleSize(size, text)}</>;
};

export default Title;
