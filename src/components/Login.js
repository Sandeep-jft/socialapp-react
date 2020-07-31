import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { userContext } from "../App";
import M from "materialize-css";
import axios from "axios";

const Login = () => {
  const { state, dispatch } = useContext(userContext);
  const [inputState, setState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const history = useHistory();

  const inputValue = (event) => {
    const { name, value } = event.target;
    setState((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    if (!inputState.email || !inputState.password) {
      return setError(true);
    } else {
      axios
        .post(
          "/login",
          { data: JSON.stringify(inputState) },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((resp) => {
          console.log("Received Data ", resp.data);
          if (resp.data.error) {
            M.toast({ html: resp.data.error, classes: "#f44336 red" });
          } else {
            localStorage.setItem("jwt", resp.data.token);
            localStorage.setItem("user", JSON.stringify(resp.data.user));
            dispatch({ type: "USER", payload: resp.data.user });
            M.toast({
              html: "Sign in successfully",
              classes: "#388e3c green darken-2",
            });
            history.push("/");
          }
        })
        .catch((err) => {
          console.log("Error ", err);
        });
    }
  };

  return (
    <>
      <div className="login_form">
        <div className="card auth_card input-field">
          <form onSubmit={submitForm}>
            <h2>SocialApp Login</h2>
            {error ? (
              <span style={{ fontSize: "15px", color: "red" }}>
                Please fill all the details
              </span>
            ) : null}
            <input
              type="text"
              name="email"
              onChange={inputValue}
              value={inputState.email}
              placeholder="Enter your email"
            />
            <input
              type="password"
              name="password"
              onChange={inputValue}
              value={inputState.password}
              placeholder="Enter your Password"
            />
            <button type="submit" className="btn waves-effect waves-light">
              Login
            </button>
            <p>
              Don't have an accout?
              <span>
                <Link to="/Signup">Click Here</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
