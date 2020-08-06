import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { userContext } from "../App";
import ProfilePost from "./ProfilePost";
import M from "materialize-css";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [userstate, setstate] = useState(null);
  const { state, dispatch } = useContext(userContext);

  const { userId } = useParams();
  console.log("The param is ", userId, "type ", typeof userId);

  useEffect(() => {
    fetch(`/userProfile/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log("Check ", resp);

        setstate(resp);
        //   setUserInfo(resp.user);
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  }, []);

  const follow = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followID: userId,
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log("The response is ", resp);
        dispatch({
          type: "UPDATE",
          payload: { followers: resp.followers, following: resp.following },
        });
        localStorage.setItem("user", JSON.stringify(resp));
        setstate((prev) => {
          return {
            ...prev,
            user: {
              ...prev.user,
              followers: [...prev.user.followers, resp._id],
            },
          };
        });
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  };

  const unfollow = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowID: userId,
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log("The response is ", resp);
        dispatch({
          type: "UPDATE",
          payload: { followers: resp.followers, following: resp.following },
        });
        localStorage.setItem("user", JSON.stringify(resp));
        setstate((prev) => {
          const updateFollow = userstate.user.followers.filter((item) => {
            return item !== resp._id;
          });
          return {
            ...prev,
            user: {
              ...prev.user,
              followers: updateFollow,
            },
          };
        });
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  };

  return (
    <>
      {userstate ? (
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
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "80px",
                }}
                src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              />
            </div>
            <div>
              <h4>{userstate ? userstate.user.name : "loading..."}</h4>
              <h5>{userstate ? userstate.user.email : "loading..."}</h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%",
                }}
              >
                <h6>
                  {userstate.post.length <= 1
                    ? userstate.post.length + " Post"
                    : userstate.post.length + " Posts"}
                </h6>
                <h6>
                  {userstate.user.followers.length <= 1
                    ? userstate.user.followers.length + " Follower"
                    : userstate.user.followers.length + " Followers"}
                </h6>
                <h6>
                  {userstate.user.following.length <= 1
                    ? userstate.user.following.length + " Following"
                    : userstate.user.following.length + " Followings"}
                </h6>
              </div>

              {userstate.user.followers.includes(state._id) ? (
                <button
                  className="waves-effect waves-light btn-small"
                  style={{ width: "100px", margin: "10px" }}
                  onClick={unfollow}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className="waves-effect waves-light btn-small"
                  style={{ width: "100px", margin: "10px" }}
                  onClick={follow}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
          <div className="gallery">
            {userstate.post.map((elem) => {
              return (
                <ProfilePost
                  key={elem._id}
                  src={elem.photo}
                  title={elem.title}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
};

export default Profile;
