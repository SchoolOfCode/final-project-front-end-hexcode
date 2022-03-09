// import React from "react";
import React, { createElement, useState, useEffect } from "react";
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
import { API_URL } from "../../config/index.js";
//08Mar SC: temp:
//import { getImagefromUserId } from "../../libs/getImageFromUserId.js";
// import image9 from "../../images/9.png";

function CommentSection({ loggedInUserId, eventId }) {
    const USE_DB_COMMENTS = true; //use this to load the comments from database
    //const USE_DB_COMMENTS = false; //use this to return to loading hard-coded comments

    // States
    const [comments, setComments] = useState(userComment);
    // setting new state to capture current event comments from database - so as to leave the hard coded comments functionality unchanged.
    const [commentsDb, setCommentsDb] = useState(null);
    const [errorHappened, setErrorHappened] = useState(false);

    const [inputValue, setInputValue] = useState("");
    // const [likesCount, setLikesCount] = useState(0);
    // const [dislikesCount, setDislikesCount] = useState(0);
    // const [action, setAction] = useState(null);
    console.log(
        `src/components/CommentSection/ loggedInUserId= ${loggedInUserId} eventId= ${eventId} `
    );
    console.log(`src/components/CommentSection/ comments[] state object is:`);
    console.log({ comments });

    // TODO:Use effect here to fetch all Db comments for the event.

    useEffect(() => {
        async function getAllCommentsforEvent() {
            const response = await fetch(
                `${API_URL}/events/${eventId}/comments`
            );
            //TODO: check http status code returned - response.ok could be true or false
            if (!response.ok) {
                //TODO: alert usre of error

                console.log(
                    `src/components/CommentSection/index.js fetch returned response.ok = false - Error.`
                );
                setErrorHappened(true);
            }
            //TODO: otherwise, only if no error, carry on and attempt to set commentsDb array.
            const data = await response.json();
            console.log(
                `src/components/CommentSection/index.js: after fetch, data retrieved is: `
            );
            console.log(data);

            const commentsArrayFromDatabase = data.payload;
            //TODO: think about if we need to check for a blank comments object. Epmty comments object IS NOT an error BUT we might want to set a flag for the render. Or on the render just check if (!commentsObjectFromDatabase) - commentsObjectFromDatabase woiuld need to be declared outside of useEffect if we were to use it elswhere.
            // UPDATE - NO NEED - would just check the state variable, commentsDb intead:
            //   if (!commentsDb) {
            //       do stuff here for case where there are no comments
            // } else {
            //      go ahead and render the comments
            // }
            console.log(
                `src/components/CommentSection/index.js: just before setting commentsDb state, commentsObjectFromDatabase is: ${commentsArrayFromDatabase} `
            );

            console.log({ commentsArrayFromDatabase });
            setCommentsDb(commentsArrayFromDatabase);
        }
        //NB: ONLY attempt to fetch all comments for a given event IF that event id is a number (and not undefined or null)
        console.log(
            `src/components/CommentSection/index.js: typeof eventId= |${typeof eventId}| `
        );
        //TODO: May need to change typeof.

        if (typeof eventId === "number") {
            getAllCommentsforEvent();
        }
    }, [eventId]);

    // Event Functions
    function handleChange(e) {
        setInputValue(e.target.value);
    }

    //function getImagePath(userId) {}
    //  TODO: will have to write a new version of handleclick - ie handleDbclick. To post new comments to the Db.

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

    //TODO: create new version to return which will map over the new commentsDb state and will pass into the Comment component.
    //  commentsDb.commentText
    // commentsDb.commentDateTimePosted
    // commentsDb.authorName
    // commentsDb.authorUserId
    // commentsDb.commentId
    //TEMP - using a big if-statement. when it's working, change to a ternary if staement around the comments map
    if (USE_DB_COMMENTS) {
        // use new return for the comments db -
        console.log(
            `src/components/CommentSection/index.js: just before render, commentsDb state is: ${commentsDb} `
        );
        console.log({ commentsDb });
        return (
            <>
                <div className="comment-section" key="100">
                    <h4 key="200">Posts</h4>
                    <div className="comment-container" key="300">
                        {!commentsDb ? (
                            <div>
                                Comments still being retrieved or not found...
                            </div>
                        ) : (
                            commentsDb.map((commentsDb, currIndex) => {
                                return (
                                    <div
                                        className="comments"
                                        key={commentsDb.commentId + "div"}
                                    >
                                        <Comment
                                            key={commentsDb.commentId}
                                            author={commentsDb.authorName}
                                            content={commentsDb.commentText}
                                            avatar={
                                                <ProfileImage
                                                    imageFileNumber={
                                                        commentsDb.authorUserId
                                                    }
                                                />
                                            }
                                            datetime={
                                                commentsDb.commentDateTimePosted
                                            }
                                        />
                                    </div>
                                );
                            })
                        )}
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

        //otherwise, if USE_DB_COMMENTS is false, then just print the exisciting hard-coded comments
    } else {
        return (
            <>
                <div className="comment-section" key="100">
                    <h4 key="200">Posts</h4>
                    <div className="comment-container" key="300">
                        {comments.map((item, currIndex) => {
                            return (
                                <div
                                    className="comments"
                                    key={currIndex + "div"}
                                >
                                    <Comment
                                        key={currIndex}
                                        author={item.author}
                                        content={item.text}
                                        avatar={
                                            <ProfileImage
                                                imageFileNumber={
                                                    item.authorUserId
                                                }
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
}

export default CommentSection;

//
//             c.comment_id as "commentId",
//             c.comment_text as "commentText",
//             to_char(c.comment_date_posted,'DD-MM-YYYY') as "commentDatePosted",
//             to_char(c.comment_create_date_time,'DD-MM-YYYY HH:MM:SS') as "commentDateTimePosted",
//             AGE(c.comment_create_date_time) as "commentAge",
//             c.comment_create_date_time as "commentCreateDateTime",
//             c.author_user_id as "authorUserId",
//             a.app_user_email as "authorEmail",
//             a.app_user_has_account as "authorHasAccount",
//             a.app_user_first_name as "authorFirstName",
//             a.app_user_last_name as "authorLastName",
//             concat(a.app_user_first_name, ' ', a.app_user_last_name) as "authorName",
//             a.app_user_profile_pic_link as "authorProfilePicLink",
//             a.app_user_create_date_time as "authorCreateDateTime",
//             e.organiser_user_id as "organiserUserId",
//             e.event_id as "eventId",
//             e.event_title as "eventTitle",
//             e.event_description as "eventDescription",
//             e.event_location as "eventLocation",
//             e.event_date as "eventDate",
//             e.event_time as "eventTime",
//             e.event_requirements as "eventRequirements",
//             e.event_category as "eventCategory",
//             e.event_create_date_time as "eventCreateDateTime"

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
