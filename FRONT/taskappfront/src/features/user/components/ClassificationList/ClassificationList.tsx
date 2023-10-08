import React from 'react';
import './ClassificationList.scss';
import { IExtendedUser } from '../../../../models/IExtendedUser';
import ClassificationListElement from './ClassificationListElement/ClassificationListElement';

interface ClassificationListProps {
  users: IExtendedUser[];
}

const ClassificationList: React.FC<ClassificationListProps> = ({ users }) => {
  return (
    <div className="classification-list">
      {users.map((user: IExtendedUser, index: number) => (
        <ClassificationListElement name={user.name} number={index + 1} tasks={`${user.completed}/${user.completed + user.pending}`}  />
      ))}
    </div>
  );
};

export default ClassificationList;
