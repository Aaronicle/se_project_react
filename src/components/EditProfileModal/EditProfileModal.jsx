import { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import UserContext from "../../contexts/UserContext";

function EditProfileModal({ isOpen, onClose, onSubmit }) {
  const { currentUser } = useContext(UserContext);
  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setAvatar(currentUser.avatar);
    }
  }, [currentUser, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { name, avatar };
    onSubmit(updatedData);
  };

  const isFormValid = () => {
    return name && avatar;
  };
  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Edit"
      isOpen={isOpen}
      handleCloseClick={onClose}
      onSubmit={handleSubmit}
      isValid={isFormValid()}
    >
      <label className="modal__label">
        Name
        <input
          placeholder="Name"
          type="text"
          className="modal__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
