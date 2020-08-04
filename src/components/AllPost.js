import React, { Component, useContext, useState } from "react";
import { userContext } from "../App";

const AllPost = (props) => {
  const { state, dispatch } = useContext(userContext);

  const likeFunction = () => {
    return props.like(props._id);
  };
  const unlikeFunction = () => {
    return props.unlike(props._id);
  };

  return (
    <>
      <div className="card post_card">
        <div className="card-image">
          <h5 className="deletePost">
            {props.postedBy.name}
            {props.postedBy._id === state._id && (
              <i
                className="material-icons"
                style={{ color: "red" }}
                onClick={() => {
                  props.deletePost(props._id);
                }}
              >
                delete
              </i>
            )}
          </h5>
          <img
            src={props.src}
            alt="post"
            className="responsive-img"
            style={{ height: "440px", objectFit: "cover" }}
          />
        </div>
        <div className="card-content">
          <i className="material-icons" style={{ color: "red" }}>
            favorite
          </i>

          {props.likes.includes(state._id) ? (
            <i
              className="material-icons"
              onClick={unlikeFunction}
              style={{ cursor: "pointer" }}
            >
              thumb_down
            </i>
          ) : (
            <i
              className="material-icons"
              onClick={likeFunction}
              style={{ cursor: "pointer" }}
            >
              thumb_up
            </i>
          )}

          <h6>
            {props.length <= 1
              ? props.length + " like"
              : props.length + " likes"}{" "}
          </h6>
          <h6>{props.title}</h6>
          <p>{props.body}</p>
          {props.value.comments.map((item, index) => {
            return (
              <h6 key={index}>
                <span
                  style={{ fontWeight: "350", textTransform: "capitalize" }}
                >
                  {item.postedBy.name}
                </span>
                &nbsp;
                {item.text}
              </h6>
            );
          })}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              props.makeComment(props._id, event.target[0].value);
              event.target[0].value = "";
            }}
          >
            <input type="text" placeholder="add a comment" />
          </form>
        </div>
      </div>
    </>
  );
};

export default AllPost;
