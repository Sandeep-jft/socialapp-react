import React, { Component } from "react";

export default class AllPost extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <div className="card post_card">
          <div className="card-image">
            <img
              src={this.props.src}
              alt="post"
              className="responsive-img"
              style={{ height: "440px", objectFit: "cover" }}
            />
          </div>
          <div className="card-content">
            <i className="material-icons" style={{ color: "red" }}>
              favorite
            </i>
            <h5>{this.props.title}</h5>
            <p>{this.props.body}</p>
            <input type="text" placeholder="add a comment" />
          </div>
        </div>
      </>
    );
  }
}
