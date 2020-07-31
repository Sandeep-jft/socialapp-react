import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";

const Signup = () => {
  const [inputState, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (
      !inputState.name ||
      !inputState.email ||
      !inputState.password ||
      !inputState.confirmPassword
    ) {
      return setError(true);
    } else {
      axios
        .post(
          "/signup",
          { data: JSON.stringify(inputState) },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((resp) => {
          console.log("Received Data ", resp);
          if (resp.data.error) {
            M.toast({ html: resp.data.error, classes: "#f44336 red" });
          } else {
            M.toast({
              html: "Signed up successfully",
              classes: "#388e3c green darken-2",
            });
            history.push("/Login");
          }
        })
        .catch((err) => {
          console.log("Error ", err);
        });
    }
  };

  return (
    <>
      <div className="Signup_form">
        <div className="card auth_card input-field">
          <form onSubmit={submitForm}>
            <h2>SocialApp Signup</h2>
            {error ? (
              <span style={{ fontSize: "15px", color: "red" }}>
                Please fill all the details
              </span>
            ) : null}
            <input
              onChange={inputValue}
              value={inputState.name}
              type="text"
              name="name"
              placeholder="Enter your name"
              required
            />
            <input
              onChange={inputValue}
              value={inputState.email}
              type="text"
              name="email"
              // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
              placeholder="Enter your email"
              required
            />
            <input
              onChange={inputValue}
              value={inputState.password}
              type="password"
              name="password"
              placeholder="Enter your Password"
              required
            />
            <input
              onChange={inputValue}
              value={inputState.confirmPassword}
              type="password"
              name="confirmPassword"
              placeholder="Confirm your Password"
              required
            />
            <button type="submit" className="btn waves-effect waves-light">
              Signup
            </button>
            <p>
              Already have an accout?
              <span>
                <Link to="/Login">Click Here</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
