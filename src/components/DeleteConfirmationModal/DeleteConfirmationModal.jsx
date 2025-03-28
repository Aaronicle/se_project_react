import "../ModalWithForm/ModalWithForm.css";
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  return (
    <div className={isOpen ? "modal modal_opened" : "modal"}>
      <div className=" modal__content_delete">
        <button
          type="button"
          className="modal__close modal__close_form"
          onClick={onClose}
        />
        <div className="modal__confirmation-content">
          <h2>
            Are you sure you want to delete this item? This action is
            irreversible
          </h2>
          <div className="modal__confirmation-buttons">
            <button
              type="button"
              className="modal__confirmation-button modal__confirmation-button_yes"
              onClick={onConfirm}
            >
              Yes, delete item
            </button>
            <button
              type="button"
              className="modal__confirmation-button modal__confirmation-button_no"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
