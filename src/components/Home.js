import React, { useEffect, useState } from "react";
import AllPost from "./AllPost";
import Axios from "axios";
import M from "materialize-css";

const Home = () => {
  const [totalPost, setstate] = useState([]);

  const [post, setPost] = useState([]);

  useEffect(() => {
    Axios.get("/allPost", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => {
        if (response.data.error) {
          M.toast({ html: response.data.error, classes: "#f44336 red" });
        } else {
          console.log("THe response of post is ", response.data.allpost);
          setstate(response.data.allpost);
        }
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  }, []);

  const likePost = (_id) => {
    console.log("The id is ", _id);
    Axios.put(
      "/likePost",
      {
        _id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    ).then((resp) => {
      console.log("The response is ", resp);
      setPost(resp.data.likes);
    });
  };
  const unlikePost = (_id) => {
    console.log("The id is ", _id);
    Axios.put(
      "/unlikePost",
      {
        _id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    ).then((resp) => {
      console.log("The response is ", resp);
      setPost(resp.data.likes);
    });
  };

  return (
    <div>
      {totalPost.map((value) => {
        return (
          <AllPost
            key={value._id}
            _id={value._id}
            src={value.photo}
            title={value.title}
            body={value.body}
            like={likePost}
            unlike={unlikePost}
            length={post.length}
          />
        );
      })}
    </div>
  );
};

export default Home;
