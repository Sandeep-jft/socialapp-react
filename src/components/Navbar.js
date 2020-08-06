import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "../App.css";
import { userContext } from "../App";

const Navbar = () => {
  const { state, dispatch } = useContext(userContext);
  const history = useHistory();
  const NavMenu = () => {
    if (state) {
      console.log("State ", state);
      return (
        <>
          <li>
            <Link to="/CreatePost">Create Post</Link>
          </li>

          <li>
            <Link to="/Profile">Profile</Link>
          </li>
          <li>
            <Link to="/followingPost">My following Post</Link>
          </li>
          <li>
            <button
              type="submit"
              className="btn waves-effect #e53935 red darken-1"
              onClick={() => {
                localStorage.clear();
                dispatch({ type: "CLEAR" });
                history.push("/Login");
              }}
            >
              Log out
            </button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link to="/Login">Login</Link>
          </li>

          <li>
            <Link to="/Signup">Sign up</Link>
          </li>
        </>
      );
    }
  };
  return (
    <>
      <nav>
        <div className="nav-wrapper white">
          <Link to={state ? "/" : "/Login"} className="brand-logo left">
            SocialApp
          </Link>
          <ul id="nav-mobile" className="right">
            {NavMenu()}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
