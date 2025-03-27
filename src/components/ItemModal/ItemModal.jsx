import "./ItemModal.css";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

function ItemModal({ activeModal, handleCloseClick, card, onDeleteClick }) {
  const { currentUser } = useContext(UserContext);
  const isOwn = card.owner === currentUser?._id;

  return (
    <div className={activeModal === "preview" ? "modal modal_opened" : "modal"}>
      <div className="modal__content_type_image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close modal__close_item"
        />
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
        {isOwn && (
          <button
            type="button"
            className="modal__delete-btn"
            onClick={onDeleteClick}
          >
            Delete Item
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
