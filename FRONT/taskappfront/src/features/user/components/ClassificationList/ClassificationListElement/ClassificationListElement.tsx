import React from 'react';
import './ClassificationListElement.scss'

interface ClassificationListElementProps {
  number: number;
  name: string;
  tasks: string
}

const ClassificationListElement: React.FC<ClassificationListElementProps> = ({ number, name, tasks }) => {

  return (
    <div className="classificationElement">
      <div className="classificationElement__title">
        <h3 className='classificationElement__number'>{`#${number}`}</h3>
        <h4 className='classificationElement__name'>{name}</h4>
      </div>
      <div className="classificationElement__score">
        <h3 className='classificationElement__goal'>{tasks}</h3>
      </div>
    </div>
  );
};

export default ClassificationListElement;