import React, { ChangeEvent } from 'react';
import './TextArea.scss';

interface TextAreaProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ value, onChange }) => {
  return <textarea value={value} onChange={onChange} className="textArea__default" />;
};

export default TextArea;