import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

const RegisterModal = ({ isOpen, onClose, onSubmit, handleLoginClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [serverError, setServerError] = useState("");

  const handleEmailSubmit = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!value) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordSubmit = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!value) {
      setPasswordError("Password is required");
    } else if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters ");
    } else {
      setPasswordError("");
    }
  };

  const handleNameSubmit = (e) => {
    const value = e.target.value;
    setName(value);

    if (!value) {
      setNameError("Name is required");
    } else if (value.length < 2) {
      setNameError("Name must be at least 2 characters");
    } else {
      setNameError("");
    }
  };

  const handleSignInClick = () => {
    onClose();
    handleLoginClick();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!emailError && !passwordError && !nameError) {
      try {
        await onSubmit({ email, password, name, avatar });
        onClose();
        setEmail("");
        setPassword("");
        setName("");
        setAvatar("");
      } catch (error) {
        setServerError(
          error.message || "Registration failed. Please try again"
        );
      }
    }
  };

  const isFormValid = () => {
    return (
      email &&
      password &&
      name &&
      avatar &&
      !emailError &&
      !passwordError &&
      !nameError
    );
  };
  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Next"
      isOpen={isOpen}
      handleCloseClick={onClose}
      onSubmit={handleSubmit}
      secondaryButtonText="Sign in"
      onSecondaryButtonClick={handleSignInClick}
      isValid={isFormValid()}
    >
      <label className="modal__label">
        Email*
        <input
          type="email"
          name="email"
          value={email}
          className="modal__input"
          onChange={handleEmailSubmit}
          placeholder="Email"
          required
        />
        {emailError && <span className="modal__error">{emailError}</span>}
      </label>
      <label className="modal__label">
        Password*
        <input
          type="password"
          name="password"
          value={password}
          className="modal__input"
          onChange={handlePasswordSubmit}
          placeholder="Password"
          required
        />
        {passwordError && <span className="modal__error">{passwordError}</span>}
      </label>
      <label className="modal__label">
        Name*
        <input
          type="text"
          name="name"
          value={name}
          className="modal__input"
          onChange={handleNameSubmit}
          placeholder="Name"
          required
        />
        {nameError && <span className="modal__error">{nameError}</span>}
      </label>
      <label className="modal__label">
        Avatar URL*
        <input
          type="url"
          name="avatar"
          value={avatar}
          className="modal__input"
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="Avatar URL"
        />
      </label>
      {serverError && <span className="modal__error">{serverError}</span>}
    </ModalWithForm>
  );
};

export default RegisterModal;
