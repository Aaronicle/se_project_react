import avatar from "../../assets/Avatar.png";
import "./SideBar.css"

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
      <p className="sidebar__username">Username</p>
    </div>
  );
}

export default SideBar;
