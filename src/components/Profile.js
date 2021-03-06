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
            src={state ? state.pic : "loading..."}
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
            <h6>
              {picState.length <= 1
                ? picState.length + " Post"
                : picState.length + " Posts"}
            </h6>
            <h6>
              {state.followers.length <= 1
                ? state.followers.length + " Follower"
                : state.followers.length + " Followers"}
            </h6>
            <h6>
              {state.following.length <= 1
                ? state.following.length + " Following"
                : state.following.length + " Followings"}
            </h6>
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
