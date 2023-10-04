import React from 'react';
import CheckboxListElement, { Task } from './CheckboxListElement/CheckboxListElement';
import './CheckboxList.scss';

interface CheckboxListProps {
  tasks: {
    id: string;
    title: string;
    completed: boolean;
  }[];
  isAdmin: boolean;
  onToggle: (taskId: string) => void;
}

const CheckboxList: React.FC<CheckboxListProps> = ({ tasks, isAdmin, onToggle }) => {
  return (
    <div className="checkbox-list">
      {tasks.map((task: Task) => (
        <CheckboxListElement key={task.id} task={task} isAdmin={isAdmin} onToggle={onToggle} />
      ))}
    </div>
  );
};

export default CheckboxList;
