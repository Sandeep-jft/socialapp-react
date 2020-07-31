import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { userContext } from "../App";
import ProfilePost from "./ProfilePost";
import M from "materialize-css";

const Profile = () => {
  const [picState, setstate] = useState([]);
  const { state, dispatch } = useContext(userContext);

  useEffect(() => {
    Axios.get("/myPost", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((resp) => {
        console.log("Check ", resp);
        if (resp.data.error) {
          M.toast({ html: resp.data.error, classes: "#f44336 red" });
        } else {
          setstate(resp.data.mypost);
        }
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  }, []);
  return (
    <div className="profileMainDiv">
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            alt="ProfilePic"
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          />
        </div>
        <div>
          <h4>{state ? state.name : "loading..."}</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h6>0 followers</h6>
            <h6>0 Posts</h6>
            <h6>0 Following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        {picState.map((elem) => {
          return (
            <ProfilePost key={elem._id} src={elem.photo} title={elem.title} />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
