import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const SigninModal = ({ isOpen, onClose, onSubmit, onSignUpClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const isFormValid = () => {
    return email && password;
  };

  const handleSignUpClick = () => {
    onClose();
    onSignUpClick();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setPasswordError(false);

    try {
      await onSubmit({ email, password });
      setEmail("");
      setPassword("");
      onClose();
    } catch (error) {
      console.log(error);
      setPasswordError(true);
      setServerError(error.message || "Sign in failed. Please try again.");
    }
  };

  return (
    <ModalWithForm
      title="Sign In"
      buttonText="Sign In"
      isOpen={isOpen}
      handleCloseClick={onClose}
      onSubmit={handleSubmit}
      secondaryButtonText="or Sign up"
      onSecondaryButtonClick={handleSignUpClick}
      isValid={isFormValid()}
    >
      <label
        className={`modal__label ${
          passwordError ? "modal__label_type_error" : ""
        }`}
      >
        Email
        <input
          type="email"
          className={`modal__input ${
            passwordError ? "modal__input_type_error" : ""
          }`}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label
        className={`modal__label ${
          passwordError ? "modal__label_type_error" : ""
        }`}
      >
        {passwordError ? "Incorrect Password" : "Password"}
        <input
          type="password"
          className={`modal__input ${
            passwordError ? "modal__input_type_error" : ""
          }`}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default SigninModal;
