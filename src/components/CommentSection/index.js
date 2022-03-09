// import React from "react";
import React, { createElement, useState } from "react";
import { userComment } from "../../libs/data";
import { Comment, Avatar, Tooltip, Input, Button } from "antd";
import "antd/dist/antd.css";
import {
    LikeOutlined,
    DislikeFilled,
    DislikeOutlined,
    LikeFilled,
} from "@ant-design/icons";
import ProfileImage from "../ProfileImage/index.js";
import "./CommentSection.css";
import { BiSend } from "react-icons/bi";
//08Mar SC: temp:
//import { getImagefromUserId } from "../../libs/getImageFromUserId.js";
// import image9 from "../../images/9.png";

function CommentSection() {
    // States
    const [comments, setComments] = useState(userComment);
    const [inputValue, setInputValue] = useState("");
    const [likesCount, setLikesCount] = useState(0);
    const [dislikesCount, setDislikesCount] = useState(0);
    const [action, setAction] = useState(null);

    console.log(`src/components/CommentSection/ comments[] state object is:`);
    console.log({ comments });
    // Event Functions
    function handleChange(e) {
        setInputValue(e.target.value);
    }

    function getImagePath(userId) {}
    function handleClick(e) {
        // 08Mar SC: trying different ways of getting date/time on new comments
        // this works - slightly wrong format but okay.
        const commentDateTime = Date().toLocaleString();
        //this might work, but might not
        // let today = new Date();
        // let todayDate = "-" + today.getMonth() + "-" + today.getFullYear();
        // let todayTime = today.getHours() + ":" + today.getMinutes();
        // const commentDateTime = todayDate + " " + todayTime + "AM";
        console.log(
            `src/components/CommentSection/ commentDateTime= ${commentDateTime}`
        );

        const updateComment = [
            ...comments,
            {
                ...comments,
                text: inputValue,
                author: "Dan",
                //08Mar SC: will need to add something for the new fields
                datetime: commentDateTime,
                //commentId: <<max integer>>,
                //key: same as what we set commentId to,
            },
        ];
        setComments(updateComment);
        setInputValue("");
        e.preventDefault();
        //e.target.value = ""; //08Mar SC: just seeing if this clears, since setInputValue is not (which is weird). UPDATE. Nope - didn't help. Commenting out.
    }

    //08Mar - added datetime into libs/data/userComment object, and now sending into <Comment> components, instead of sending in hard-coded datetime
    //from datetime={"25-04-2022 11:09AM"}  to datetime={item.datetime}
    //TODO: Ask Dan: in code below, why is it React.createElement in one place but just createElement in another?
    // <Avatar style={{ backgroundColor: "green" }}></Avatar>;
    return (
        <>
            <div className="comment-section" key="100">
                <h4 key="200">Posts</h4>
                <div className="comment-container" key="300">
                    {comments.map((item, currIndex) => {
                        return (
                            <div className="comments" key={currIndex + "div"}>
                                {/* <div className="profile-image">
                                    <img
                                        className="profile-pic"
                                        src={image9}
                                        alt=""
                                    />
                                    <ProfileImage  add in comment's author's user id>
                                    <span>{item.author}</span>
                                    <span>{item.text}</span>
                                    <span>{item.datetime}</span>
                                </div> */}
                                <Comment
                                    key={currIndex}
                                    author={item.author}
                                    content={item.text}
                                    avatar={
                                        <ProfileImage
                                            imageFileNumber={item.authorUserId}
                                        />
                                    }
                                    datetime={item.datetime}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="send-comment">
                <input
                    className="enter-comment"
                    type="text"
                    onChange={handleChange}
                />
                <button
                    className="send-Btn"
                    type="primary"
                    onClick={handleClick}
                >
                    <BiSend />
                </button>
            </div>
            <div className="empty-div"></div>
        </>
    );
}

export default CommentSection;

// actions={[
//     <Tooltip
//         title="Like"
//         key={item.commentId + "like"}
//     >
//         <span
//             onClick={() => {
//                 setLikesCount(1);
//                 setDislikesCount(0);
//                 setAction("liked");
//             }}
//         >
//             {createElement(
//                 action === "liked"
//                     ? LikeFilled
//                     : LikeOutlined
//             )}
//             {likesCount}
//         </span>
//     </Tooltip>,
//     <Tooltip
//         title="Dislike"
//         key={item.commentId + "dislike"}
//     >
//         <span
//             onClick={() => {
//                 setLikesCount(0);
//                 setDislikesCount(1);
//                 setAction("disliked");
//             }}
//         >
//             {React.createElement(
//                 action === "disliked"
//                     ? DislikeFilled
//                     : DislikeOutlined
//             )}
//             {dislikesCount}
//         </span>
//     </Tooltip>,
// ]}
