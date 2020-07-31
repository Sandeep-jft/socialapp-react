import React from "react";
import Profile from "./Profile";

function ProfilePost(props) {
  return (
    <>
      <img alt={props.title} className="items" src={props.src} />
    </>
  );
}

export default ProfilePost;
