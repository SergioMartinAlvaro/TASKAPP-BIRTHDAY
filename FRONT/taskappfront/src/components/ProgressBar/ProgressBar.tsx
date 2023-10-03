import React, { FC, HTMLAttributes } from 'react';
import './ProgressBar.scss';

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  progress: number; // Valor entre 0 y 100 para representar el progreso en porcentaje
}

const ProgressBar: FC<ProgressBarProps> = ({ progress, ...rest }) => {
  return (
    <div className="progress-bar" {...rest}>
      <div className="progress-foreground" style={{ width: `${progress}%` }} />
      <div className="progress-background" />
    </div>
  );
};

export default ProgressBar;