import React, { useState, useEffect } from "react";
import axios from "axios";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
  const history = useHistory();
  const [post, setPost] = useState({
    title: "",
    body: "",
  });
  const [imagefile, setImageFile] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url !== "") {
      console.log("The uri is ", url);
      axios
        .post(
          "/createPost",
          {
            data: JSON.stringify({
              title: post.title,
              body: post.body,
              photo: url,
            }),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        )
        .then((resp) => {
          console.log("Received Data ", resp.data);
          if (resp.data.error) {
            M.toast({ html: resp.data.error, classes: "#f44336 red" });
          } else {
            M.toast({
              html: "post created successfully",
              classes: "#388e3c green darken-2",
            });
            history.push("/");
          }
        })
        .catch((err) => {
          console.log("Error ", err);
        });
    }
  }, [url]);

  const inputChange = (event) => {
    const { name, value } = event.target;
    return setPost((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const postDetails = () => {
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
  return (
    <div className="createPostCard">
      <div className="card auth_card input-field">
        <h2>Create Post</h2>
        <input
          type="text"
          name="title"
          onChange={inputChange}
          value={post.title}
          placeholder="Enter title"
        />
        <input
          type="text"
          name="body"
          onChange={inputChange}
          value={post.body}
          placeholder="Enter description"
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
        <button onClick={postDetails} className="btn waves-effect waves-light">
          Submit Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
