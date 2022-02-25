// import React from "react";
import React, { createElement, useState } from "react";
import userComment from "../../libs/data";
import { Comment, Avatar, Tooltip, Input, Button } from "antd";
import "antd/dist/antd.css";
import {
  LikeOutlined,
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
} from "@ant-design/icons";
import ProfileImage from "../ProfileImage";

function CommentSection() {
  // States
  const [comments, setComments] = useState(userComment);
  const [inputValue, setInputValue] = useState("");
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [action, setAction] = useState(null);

  // Event Functions
  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleClick(e) {
    const updateComment = [
      ...comments,
      {
        ...comments,
        text: inputValue,
        author: "Dan",
      },
    ];
    setComments(updateComment);
    setInputValue("");
    e.preventDefault();
  }

  return (
    <div
      style={{
        display: "block",
        width: 1000,
        padding: 30,
      }}
    >
      <h4>Posts</h4>
      {comments.map((item) => {
        return (
          <div>
            <Comment
              author={item.author}
              content={item.text}
              avatar={<Avatar style={{ backgroundColor: "green" }}>D</Avatar>}
              datetime={"25-04-2022 11:09AM"}
              actions={[
                <Tooltip title="Like">
                  <span
                    onClick={() => {
                      setLikesCount(1);
                      setDislikesCount(0);
                      setAction("liked");
                    }}
                  >
                    {createElement(
                      action === "liked" ? LikeFilled : LikeOutlined
                    )}
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
            />
          </div>
        );
      })}

      <Input onChange={handleChange} />
      <Button type="primary" onClick={handleClick}>
        Send
      </Button>
    </div>
  );
}

export default CommentSection;
