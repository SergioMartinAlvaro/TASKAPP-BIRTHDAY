import React, { FC, ReactNode } from 'react';
import './Tooltip.scss';

interface ITooltipProps {
  position: 'top' | 'bottom' | 'left' | 'right';
  children: ReactNode;
  type: 'main' | 'secondary'
}

const Tooltip: FC<ITooltipProps> = ({ position, children, type }) => {
  return (
    <div className={`tooltip tooltip-${position}`}>
      <div className="dialog-content">{children}</div>
      <div className={`dialog-triangle dialog-triangle-${position}`} />
    </div>
  );
};

export default Tooltip;
