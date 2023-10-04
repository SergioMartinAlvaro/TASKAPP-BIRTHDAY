import React from 'react';
import './CheckboxListElement.scss'
import DeleteIcon from '../../../../../assets/icons/Eliminar.svg';
import EditIcon from '../../../../../assets/icons/Modificar.svg';

export interface Task {
    id: string;
    title: string;
    completed: boolean;
    actions: {
      edit?: () => void;
      delete?: () => void;
    };
  }

interface CheckboxListElementProps {
  task: Task;
  isAdmin: boolean;
  onToggle: (taskId: string) => void;
}

const CheckboxListElement: React.FC<CheckboxListElementProps> = ({ task, isAdmin, onToggle }) => {
  const handleCheckboxToggle = () => {
    onToggle(task.id);
  };

  return (
    <div className="checkbox-list-element">
      <input type="checkbox" checked={task.completed} onChange={handleCheckboxToggle} className='list__checkbox'/>
      <span className={`list__text${task.completed ? '--completed' : ''}`}>{task.title}</span>
      {isAdmin && (
        <div className="admin-icons">
          {task.actions?.edit && <img src={EditIcon} alt="edit-icon" onClick={task.actions.edit} className="icon" />}
          {task.actions?.delete && <img src={DeleteIcon} alt="delete-icon" onClick={task.actions.delete} className="icon" />}
        </div>
      )}
    </div>
  );
};

export default CheckboxListElement;