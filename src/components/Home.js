import React, { useEffect, useState } from "react";
import AllPost from "./AllPost";
import Axios from "axios";
import M from "materialize-css";

const Home = () => {
  const [totalPost, setstate] = useState([]);

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
    fetch("/likePost", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        _id: _id,
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log("The response is ", resp);
        const newData = totalPost.map((val) => {
          if (val._id == resp._id) {
            return resp;
          } else {
            return val;
          }
        });
        console.log("the new data is ", newData);
        setstate(newData);
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  };
  const unlikePost = (_id) => {
    console.log("The id is ", _id);
    fetch("/unlikePost", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        _id: _id,
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log("The response is ", resp);
        const newData = totalPost.map((val) => {
          if (val._id == resp._id) {
            return resp;
          } else {
            return val;
          }
        });
        console.log("the new data is ", newData);
        setstate(newData);
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  };

  const makeComment = (_id, text) => {
    console.log("The id is ", _id);
    fetch("/comments", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        _id,
        text,
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log("The response of comments is : ", resp);
        const newData = totalPost.map((val) => {
          if (val._id == resp._id) {
            return resp;
          } else {
            return val;
          }
        });
        console.log("the new data is ", newData);
        setstate(newData);
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  };

  const deletePost = (_id) => {
    const postId = _id;
    fetch(`deletePost/${postId}`, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("The deleted post result is ", result);
        const newData = AllPost.filter((item) => {
          return item._id !== result._id;
        });
        setstate(newData);
      });
  };

  return (
    <div>
      {totalPost.map((value) => {
        return (
          <AllPost
            key={value._id}
            _id={value._id}
            postedBy={value.postedBy}
            src={value.photo}
            title={value.title}
            likes={value.likes}
            body={value.body}
            like={likePost}
            unlike={unlikePost}
            length={value.likes.length}
            value={value}
            makeComment={makeComment}
            deletePost={deletePost}
          />
        );
      })}
    </div>
  );
};

export default Home;
