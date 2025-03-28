import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import "./SideBar.css";

function SideBar({ onEditProfileClick, onLogout }) {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        <img
          className="sidebar__avatar"
          src={currentUser?.avatar}
          alt="User avatar"
        />
        <p className="sidebar__username">{currentUser?.name} </p>
      </div>
      <div className="sidebar__buttons">
        <button className="sidebar__button" onClick={onEditProfileClick}>
          Change profile data
        </button>
        <button className="sidebar__button" onClick={onLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
