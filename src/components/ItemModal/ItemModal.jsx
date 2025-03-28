import "./ItemModal.css";
import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

function ItemModal({ activeModal, handleCloseClick, card, onDeleteClick }) {
  const { currentUser } = useContext(UserContext);
  const isOwn = card.owner === currentUser?._id;
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    onDeleteClick();
    setIsConfirmationOpen(false);
    handleCloseClick();
  };

  return (
    <>
      <div
        className={activeModal === "preview" ? "modal modal_opened" : "modal"}
      >
        <div className="modal__content_type_image">
          <button
            onClick={handleCloseClick}
            type="button"
            className="modal__close modal__close_item"
          />
          <img src={card.imageUrl} alt={card.name} className="modal__image" />
          <div className="modal__footer">
            <div className="modal__footer-container">
              <h2 className="modal__caption">{card.name}</h2>
              <p className="modal__weather">Weather: {card.weather}</p>
            </div>
            {isOwn && (
              <button
                type="button"
                className="modal__delete-btn"
                onClick={handleDeleteClick}
              >
                Delete Item
              </button>
            )}
          </div>
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

export default ItemModal;
