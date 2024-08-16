import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root'); // Make sure this is the root element of your app

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm, message }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-2xl mb-4">Confirm Action</h2>
      <p className="mb-6">{message}</p>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded mr-4 hover:bg-red-600 transition duration-200"
        onClick={onConfirm}
      >
        Confirm
      </button>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
        onClick={onRequestClose}
      >
        Cancel
      </button>
    </ReactModal>
  );
};

export default ConfirmationModal;
