import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/Avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({
  handleAddClick,
  weatherData,
  onSignupClick,
  onSigninClick,
  onSignOut,
  isLoggedIn,
  currentUser,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  console.log("Header isLoggedIn:", isLoggedIn);

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="header__logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser?.name}</p>
              <img
                src={currentUser?.avatar || avatar}
                alt={currentUser?.name}
                className="header__avatar"
              />
            </div>
          </Link>
          <button type="button" className="header__button" onClick={onSignOut}>
            Log out
          </button>
        </>
      ) : (
        <div className="header__auth-buttons">
          <button
            className="header__button"
            type="button"
            onClick={onSignupClick}
          >
            Sign Up
          </button>
          <button
            type="button"
            className="header__button"
            onClick={onSigninClick}
          >
            Sign In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
