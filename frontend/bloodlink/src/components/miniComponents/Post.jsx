import "./Post.css";

import React from "react";
import { useState } from "react";
import comment from "../../assets/comment.png";
import lik1 from "../../assets/lik1.png";
import like from "../../assets/like.png";

const Post = (props) => {
  const like_count = props.count;

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(like_count);

  const handleLikeClick = () => {
    if (liked) {
      // If already liked, decrease like count and set liked to false
      setLikeCount((prevCount) => prevCount - 1);
      setLiked(false);
    } else {
      // If not liked, increase like count and set liked to true
      setLikeCount((prevCount) => prevCount + 1);
      setLiked(true);
    }
  };

  return (
    <div className="post-outer">
      <div className="post-header">
        <div className="head-content">
          <img src={props.profileimage} className="profile-image" />
          <div className="profile-name">
            <span className="name">{props.profilename}</span>
            <span className="location">{props.location}</span>
          </div>
          <div className="date">
            <span>{props.date}</span>
          </div>
        </div>
      </div>
      <div className="post-image">
        <img src={props.donateimage} className="post-image1" />
      </div>

      <div className="post-description">
        <span className="post-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad
          minim veniam,{" "}
        </span>
      </div>

      <div className="post-footer">
        <div className="post-footer1">
          <img src={comment} className="post-footer-image" />
        </div>
        <span className="comment-text">{props.comment}</span>

        <div className="post-footer2" onClick={handleLikeClick}>
          <img
            src={liked ? lik1 : like}
            className="post-footer-image"
            alt="like"
          />
        </div>

        <span className="comment-text">{likeCount}</span>
      </div>
    </div>
  );
};

export default Post;
