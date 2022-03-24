// 09Mar - with Jordan - replaced state with useRef - no re-rendering, and fixed our clear input button issue - and the handleChange() is no longer needed!!!
import React, { useState, useEffect, useRef } from "react";
import { BiSend } from "react-icons/bi";
import { Comment } from "antd";
import ProfileImage from "../ProfileImage/index.js";
import "./CommentSection.css";
import "antd/dist/antd.css";
import { API_URL } from "../../config/index.js";

function CommentSection({ loggedInUserId, eventId }) {
    // *** USE STATES ***
    //const [comments, setComments] = useState(userComment); // NO LONGER NEEDED
    const [commentsDb, setCommentsDb] = useState(null); // setting new state to capture current event comments from database - so as to leave the hard coded comments functionality unchanged.
    const [errorHappened, setErrorHappened] = useState(false);
    const [countNewComments, setCountNewComments] = useState(0); // using this to trigger the useEffect to re-fetch comments (and all their extra details) from the database after a comment is posted.

    // *** USE REFS ***
    let inputRef = useRef(""); //useRef - replacing state with useRef - no re-rendering, and fixed our clear input button issue

    // Fetch all comments for the event from the database whenever the event changes, or a new comment is added
    useEffect(() => {
        async function getAllCommentsforEvent() {
            const response = await fetch(
                `${API_URL}/events/${eventId}/comments`
            );
            // ERROR CHECKING: response.ok will be false if an http status code of 400, 401, 500 etc returned
            if (!response.ok) {
                //TODO: alert user of error - and maybe redirect to login etc?
                console.log(
                    `CommentSection-USE-EFFECT: ERROR response.ok = false`
                );
                setErrorHappened(true);
            }

            //otherwise, only if no error, carry on and attempt to set commentsDb array, which may be validly empty.
            const data = await response.json();
            const commentsArrayFromDatabase = data.payload;
            setCommentsDb(commentsArrayFromDatabase);
        }
        //NB: ONLY attempt to fetch all comments for a given event IF that event id is a number (and not undefined or null)
        if (typeof eventId === "number") {
            getAllCommentsforEvent();
        }
    }, [eventId, countNewComments]); // FYI: want to trigger useEffect on change of eventID OR a new comment being posted

    function handleClick(e) {
        e.preventDefault();

        async function postCommenttoDb() {
            const newComment = {
                eventId: eventId,
                authorUserId: loggedInUserId,
                commentText: inputRef.current.value,
            };

            // POST (Insert) the newly created COMMENT into database and return with the new commentId
            const response = await fetch(`${API_URL}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newComment),
            });
            //TODO: add error checking to check the POST results
            const data = await response.json();

            // trigger the useEffect to re-fetch all the comments from the database - doing this because the fetch gets lots of extra fields for author etc TODO: this may change when we implement socket.io to proactively display comments from other users as they are posted
            setCountNewComments(countNewComments + 1);
        }
        postCommenttoDb();
        inputRef.current.value = ""; // useRef - to fix our "clear input field" on click button issue
    }

    // useRef - using "ref={inputRef}" in  the input field below instead of inputValue
    return (
        <>
            <div className="comment-section" key="100">
                <h4 className="postsTitle" key="200">
                    Posts
                </h4>
                <div className="comment-container" key="300">
                    {!commentsDb ? (
                        <div>
                            Comments still being retrieved or none found...
                        </div>
                    ) : (
                        commentsDb.map((commentsDb) => {
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
                <input className="enter-comment" type="text" ref={inputRef} />
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
