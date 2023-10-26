import React from 'react';
import './modal.css'
const Modal = (props:any) => {
    const {isOpen, onClose, children, onSave} = props;
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          {children}
        </div>
        <button className="modal-save-button" onClick={onSave}>
          Save
        </button>
        <button className="modal-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
