import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/Avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

const Header = ({
  handleAddClick,
  weatherData,
  onSignupClick,
  onSigninClick,
}) => {
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  const { isLoggedIn, currentUser, onSignOut } = useContext(UserContext);
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
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar header__avatar-placeholder">
                  {getInitial(currentUser?.name)}
                </div>
              )}
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
};

export default Header;
