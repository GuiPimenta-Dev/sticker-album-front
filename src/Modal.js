import React, { useState } from "react";

function Modal({ isOpen, onClose, children }) {
  const [isDisplayed, setIsDisplayed] = useState(isOpen);

  function handleClose() {
    setIsDisplayed(false);
    onClose && onClose();
  }

  return isDisplayed ? (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close-button" onClick={handleClose}>
          X
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  ) : null;
}

export default Modal;
