import React, { useState, useEffect } from "react";
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
  const [imagefile, setImageFile] = useState("");
  const [url, setUrl] = useState(undefined);
  const [error, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (url) {
      submitForm();
    }
  }, [url]);

  const inputValue = (event) => {
    const { name, value } = event.target;
    setState((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const postDetails = (event) => {
    const data = new FormData();
    data.append("file", imagefile);
    data.append("api_key", "164859639695227");
    data.append("upload_preset", "socialApp");
    data.append("cloud_name", "socialApp");

    axios
      .post("https://api.cloudinary.com/v1_1/sandeep32/upload", data)
      .then((res) => {
        console.log("The resultant url is ", res.data.url);
        setUrl(res.data.url);
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  };

  const submitForm = () => {
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
          {
            data: JSON.stringify({
              name: inputState.name,
              email: inputState.email,
              password: inputState.password,
              confirmPassword: inputState.confirmPassword,
              pic: url,
            }),
          },
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

  const postSubmit = (event) => {
    event.preventDefault();
    if (imagefile) {
      postDetails();
    } else {
      submitForm();
    }
  };

  return (
    <>
      <div className="Signup_form">
        <div className="card auth_card input-field">
          <form onSubmit={postSubmit}>
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
            <div className="file-field input-field">
              <div className="btn">
                <span>Upload Pic</span>
                <input
                  type="file"
                  name="imageFile"
                  onChange={(event) => setImageFile(event.target.files[0])}
                />
              </div>
              <div className="file-path-wrapper">
                <input
                  style={{ color: "black" }}
                  className="file-path validate"
                  type="text"
                />
              </div>
            </div>
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
