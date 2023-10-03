import React, { FC } from 'react';
import "./AdminListElement.scss";
interface AdminListElementProps {
    text: string;
    icons: { [key: string]: { icon: React.ReactElement; action: () => void } };
}

const AdminListElement: FC<AdminListElementProps> = ({ text, icons }) => {
    return (
        <div className="list-item">
          <span className='list-text'>{text}</span>
          <div className="icons">
            {Object.entries(icons).map(([iconName, { icon, action }], index) => (
              <span key={index} className="icon" onClick={action}>
                {icon}
              </span>
            ))}
          </div>
        </div>
      );
};

export default AdminListElement;