import React, { useEffect, useState } from "react";
import AllPost from "./AllPost";
import Axios from "axios";
import M from "materialize-css";

const Home = () => {
  const [state, setstate] = useState([]);

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
  return (
    <div>
      {state.map((value) => {
        return (
          <AllPost
            key={value._id}
            src={value.photo}
            title={value.title}
            body={value.body}
          />
        );
      })}
    </div>
  );
};

export default Home;
