// import React from "react";
import React, { createElement, useState } from "react";
import { Comment, Avatar, Tooltip } from "antd";
import "antd/dist/antd.css";
import {
  LikeOutlined,
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
} from "@ant-design/icons";

function CommentSection() {
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [action, setAction] = useState(null);
  return (
    <div
      style={{
        display: "block",
        width: 700,
        padding: 30,
      }}
    >
      <h4>Post Section</h4>
      <Comment
        author={<a>James Gaynor</a>}
        avatar={<Avatar style={{ backgroundColor: "green" }}>G</Avatar>}
        content={
          <p>
            I am going to play darts, looking forward to it, what about you Dan
            are you in?
          </p>
        }
        actions={[
          <Tooltip title="Like">
            <span
              onClick={() => {
                setLikesCount(1);
                setDislikesCount(0);
                setAction("liked");
              }}
            >
              {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
              {likesCount}
            </span>
          </Tooltip>,
          <Tooltip title="Dislike">
            <span
              onClick={() => {
                setLikesCount(0);
                setDislikesCount(1);
                setAction("disliked");
              }}
            >
              {React.createElement(
                action === "disliked" ? DislikeFilled : DislikeOutlined
              )}
              {dislikesCount}
            </span>
          </Tooltip>,
        ]}
        datetime={"25-04-2022 11:09AM"}
      />
      <Comment
        author={<a>Dan Martin</a>}
        avatar={<Avatar style={{ backgroundColor: "green" }}>G</Avatar>}
        content={<p>BULLS EYE!</p>}
        actions={[
          <Tooltip title="Like">
            <span
              onClick={() => {
                setLikesCount(1);
                setDislikesCount(0);
                setAction("liked");
              }}
            >
              {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
              {likesCount}
            </span>
          </Tooltip>,
          <Tooltip title="Dislike">
            <span
              onClick={() => {
                setLikesCount(0);
                setDislikesCount(1);
                setAction("disliked");
              }}
            >
              {React.createElement(
                action === "disliked" ? DislikeFilled : DislikeOutlined
              )}
              {dislikesCount}
            </span>
          </Tooltip>,
        ]}
        datetime={"25-04-2022 11:09AM"}
      />
    </div>
  );
}

export default CommentSection;
