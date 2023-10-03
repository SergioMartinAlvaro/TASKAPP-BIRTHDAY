import React, { FC, ReactNode } from 'react';
import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  buttons?: React.ReactElement[];
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children, buttons }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <div className="modal-close" onClick={onClose}>
            &times;
          </div>
        </div>
        <div className="modal-content">{children}</div>
        <div className="modal-footer">
          {buttons && buttons.map((button, index) => React.cloneElement(button, { key: index }))}
        </div>
      </div>
    </div>
  );
};

export default Modal;