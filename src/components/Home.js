import React from "react";

const Home = () => {
  return (
    <div>
      <div className="card post_card">
        <div className="card-image">
          <img
            src="https://images.unsplash.com/photo-1468272687535-bac12b03f098?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt="post"
          />
        </div>
        <div className="card-content">
          <i className="material-icons" style={{ color: "red" }}>
            favorite
          </i>
          <h5>Title</h5>
          <p>This is description of the post</p>
          <input type="text" placeholder="add a comment" />
        </div>
      </div>
      <div className="card post_card">
        <div className="card-image">
          <img
            src="https://images.unsplash.com/photo-1468272687535-bac12b03f098?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt="post"
          />
        </div>
        <div className="card-content">
          <i className="material-icons" style={{ color: "red" }}>
            favorite
          </i>
          <h5>Title</h5>
          <p>This is description of the post</p>
          <input type="text" placeholder="add a comment" />
        </div>
      </div>
      <div className="card post_card">
        <div className="card-image">
          <img
            src="https://images.unsplash.com/photo-1468272687535-bac12b03f098?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt="post"
          />
        </div>
        <div className="card-content">
          <i className="material-icons" style={{ color: "red" }}>
            favorite
          </i>
          <h5>Title</h5>
          <p>This is description of the post</p>
          <input type="text" placeholder="add a comment" />
        </div>
      </div>
    </div>
  );
};

export default Home;
