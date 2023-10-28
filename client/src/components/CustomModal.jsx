import React from "react";

const Modal = ({ isOpen, closeModal, children, title }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay fixed inset-0 bg-black opacity-40"></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div class="flex items-start justify-between border-b rounded-t dark:border-lime-600">
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
          </div>
          <div class="p-6 space-y-6">{children}</div>
          <div class="flex items-center p-2 space-x-2 border-t border-gray-200 rounded-b dark:border-blue-600">
            <button
              className="modal-close px-4 py-2 text-white font-semibold rounded-lg hover:bg-yellow-400 bg-yellow-500"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
