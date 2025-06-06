import React, { Component } from "react";

export default class NewsTile extends Component {
  render() {
    let { title, desc, imgUrl, newsUrl, date, author } = this.props;
    return (
      <div
        className="card"
        style={{
          backgroundColor: "#525252",
          color: "white",
        }}
      >
        <img
          src={
            !imgUrl
              ? "https://th.bing.com/th/id/OIP.EjAL2jn03BXr8OOlqUFm7gHaEK?w=279&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              : imgUrl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h6>Author : {!author ? "Not available" : author}</h6>
          <h6>Date : {date}</h6>
          <h5 className="card-title">{title}....</h5>

          <p className="card-text">{desc}....</p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-dark btn-primary"
          >
            View article
          </a>
        </div>
      </div>
    );
  }
}
