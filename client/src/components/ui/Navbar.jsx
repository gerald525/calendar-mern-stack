import LogoutIcon from "./icons/LogoutIcon";
import UserIcon from "./icons/UserIcon";
import "./navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <div className="navbar__item">
          <UserIcon />
          <p className="navbar__text">Juan Pablo</p>
        </div>
        <div className="navbar__item">
          <LogoutIcon className="navbar__link" title="Logout"/>
        </div>
      </ul>
    </nav>
  );
};
export default Navbar;
