import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar bg-body-tertiary border-bottom">
            <div className="container">
                <NavLink to="/" className="navbar-brand mb-0 h1">Home</NavLink>
            </div>
        </nav>
    );
};

export default NavBar;