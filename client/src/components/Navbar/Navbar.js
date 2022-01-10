import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import "./Navbar.scss";

function Navbar() {
  const { user, getUser } = useContext(UserContext);

  async function logOut() {
    await axios.get("http://localhost:5000/auth/logOut");
    await getUser()
  }

  return (
    <div className="navbar">
      <Link to="/">
        <h1 className="brand"> Code Snippets </h1>
      </Link>
      {user === null ? (
        <div className="nav-links">
          <Link to="/login" className="link login"> Log In </Link>
          <Link to="/register" className="link register" > Register </Link>
        </div>
      ) : (
        user && <button className="logout-btn" onClick={logOut}> Log out </button>
      )}
    </div>
  );
}

export default Navbar;
