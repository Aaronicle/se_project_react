import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const SigninModal = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    try {
      console.log("Form data:", { email, password });
      await onSubmit({ email, password });
      onClose();
      setEmail("");
      setPassword("");
    } catch (error) {
      setServerError(error.message || "Sign in failed. Please try again.");
    }
  };

  return (
    <ModalWithForm
      title="Sign In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email*
        <input
          type="email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label className="modal__label">
        Password*
        <input
          type="password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      {serverError && <p className="modal__error">{serverError}</p>}
    </ModalWithForm>
  );
};

export default SigninModal;
