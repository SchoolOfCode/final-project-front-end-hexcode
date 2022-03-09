// import React, { createElement, useState, useEffect, useRef } from "react";
import React, { useState, useEffect, useRef } from "react";
// import { BiLeftTopArrowCircle, BiSend } from "react-icons/bi";
import { BiSend } from "react-icons/bi";
// import { Comment, Avatar, Tooltip, Input, Button } from "antd";
import { Comment } from "antd";
// import {
//     LikeOutlined,
//     DislikeFilled,
//     DislikeOutlined,
//     LikeFilled,
// } from "@ant-design/icons";
import ProfileImage from "../ProfileImage/index.js";
import "./CommentSection.css";
import "antd/dist/antd.css";
import { userComment } from "../../libs/data";
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

    // const [inputValue, setInputValue] = useState("");
    let inputRef = useRef(""); // 09Mar - with Jordan - replacing state with useRef - no re-rendering, and fixed our clear input button issue
    // const [likesCount, setLikesCount] = useState(0);
    // const [dislikesCount, setDislikesCount] = useState(0);
    // const [action, setAction] = useState(null);

    const [countNewComments, setCountNewComments] = useState(0); // using this to trigger the useEffect to re-fetch comments (and all their extra details) from the database after a comment is posted.
    console.log(
        `CommentSection - TOP loggedInUserId= ${loggedInUserId} eventId= ${eventId} `
    );
    // console.log(`src/components/CommentSection/ comments[] state object is:`);
    // console.log({ comments });

    // DONE - Use effect here to fetch all Db comments for the event.
    useEffect(() => {
        async function getAllCommentsforEvent() {
            const response = await fetch(
                `${API_URL}/events/${eventId}/comments`
            );
            // check http status code returned - response.ok could be true or false
            if (!response.ok) {
                //TODO: alert user of error - and maybe redirect to login etc?
                console.log(
                    `CommentSection-USE-EFFECT: fetch returned response.ok = false - ERROR.`
                );
                setErrorHappened(true);
            }
            //otherwise, only if no error, carry on and attempt to set commentsDb array.
            const data = await response.json();
            console.log(
                `CommentSection-USE-EFFECT: : after fetch, data retrieved is: `
            );
            console.log(data);
            const commentsArrayFromDatabase = data.payload;
            console.log(
                `CommentSection-USE-EFFECT: : just before setting commentsDb state, commentsObjectFromDatabase=`
            );
            console.log({ commentsArrayFromDatabase });
            //TODO: think about if we need to check for a blank comments object. Epmty comments object IS NOT an error BUT we might want to do something else on render
            setCommentsDb(commentsArrayFromDatabase);
        }
        //NB: ONLY attempt to fetch all comments for a given event IF that event id is a number (and not undefined or null)
        // console.log(
        //     `src/components/CommentSection/index.js: typeof eventId= |${typeof eventId}| `
        // );
        if (typeof eventId === "number") {
            getAllCommentsforEvent();
        }
    }, [eventId, countNewComments]);
    // ie want to trigger useEffect on change of eventID OR a new comment being posted

    // 09Mar - with Jordan - replacing state with useRef - no re-rendering, and fixed our clear input button issue - so the handleChange() is no longer needed!!!
    // Event Functions
    // function handleChange(e) {
    //     setInputValue(e.target.value);
    // }

    //function getImagePath(userId) {}
    //  DONE will have to write a new version of handleclick - ie handleDbclick. To post new comments to the Db.
    function handleClick(e) {
        e.preventDefault();

        if (USE_DB_COMMENTS) {
            // DONE - call post-comments to post the new comment to database
            async function postCommenttoDb() {
                const newComment = {
                    eventId: eventId,
                    authorUserId: loggedInUserId,
                    commentText: inputRef.current.value,
                };
                console.log(
                    "******** COMMENTS SECTION - handleClick - postCommenttoDb: newComment = ***********"
                );
                console.log(newComment);

                // POST (Insert) the newly created COMMENT into database and return with the new commentId f
                const response = await fetch(`${API_URL}/comments`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newComment),
                });
                const data = await response.json();
                console.log(
                    `COMMENTS SECTION - handleClick- postCommenttoDb: data:`
                );
                console.log({ data });
                console.log(
                    `COMMENTS SECTION - handleClick - postCommenttoDb:New Comment ID (data.commentId) = ${data.commentId}`
                );

                //trigger the useEffect to re-fetch all the comments from the database - doing this because the fetch gets lots of extra fields for author etc
                //NB: this
                setCountNewComments(countNewComments + 1);
                // Yes - we understand that this will print the old countNewComments
                console.log(
                    `COMMENTS SECTION - handleClick - countNewComments = ${countNewComments}`
                );
            }

            postCommenttoDb();
            //setInputValue("");
            inputRef.current.value = ""; // 09Mar - with Jordan - replacing state with useRef - no re-rendering, and fixed our clear input button issue

            // TODO: update state with the new comment as well (OR re-fetch)
            // const [commentsDb, setCommentsDb] - need to add object to array.
        } else {
            const commentDateTime = Date().toLocaleString();
            const updateComment = [
                ...comments,
                {
                    ...comments,
                    text: inputRef.current.value, // 09Mar - with Jordan - replacing state with useRef - no re-rendering, and fixed our clear input button issue
                    author: "Dan",
                    //08Mar SC: will need to add something for the new fields
                    datetime: commentDateTime,
                    //commentId: <<max integer>>,
                    //key: same as what we set commentId to,
                },
            ];
            setComments(updateComment);
            //setInputValue("");
        }
    }

    //TODO: create new version to return which will map over the new commentsDb state and will pass into the Comment component.
    //  commentsDb.commentText
    // commentsDb.commentDateTimePosted
    // commentsDb.authorName
    // commentsDb.authorUserId
    // commentsDb.commentId
    //TEMP - using a big if-statement. when it's working, change to a ternary if staement around the comments map
    if (USE_DB_COMMENTS) {
        // use new return for the comments db -
        // console.log(
        //     `src/components/CommentSection/index.js: just before render, commentsDb state is: ${commentsDb} `
        // );
        // console.log({ commentsDb });

        // 09Mar - with Jordan - replacing state with useRef - no re-rendering, and fixed our clear input button issue
        //         using "ref={inputRef}" in  the input field below instead of inputValue
        return (
            <>
                <div className="comment-section" key="100">
                    <h4 key="200">Posts</h4>
                    <div className="comment-container" key="300">
                        {!commentsDb ? (
                            <div>
                                Comments still being retrieved or none found...
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
                        ref={inputRef}
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
                        ref={inputRef}
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
