import React, { FC } from 'react';
import AdminListElement from './AdminListElement/AdminListElement';
import "./AdminList.scss";

interface AdminListProps {
    items: { text: string; icons: { [key: string]: { icon: React.ReactElement; action: () => void } } }[];
}

const AdminList: FC<AdminListProps> = ({ items }) => {
    return (
        <div className="list">
          {items.map((item, index) => (
            <AdminListElement
              key={index}
              text={item.text}
              icons={item.icons}
            />
          ))}
        </div>
      );
};

export default AdminList;