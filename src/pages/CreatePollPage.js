// import React, { useState } from "react";
import React, { useState, useContext } from "react"; //useContext
import { PageWrapper } from "../components/App/index.js"; //useContext

import { useParams } from "react-router-dom";
import { Button } from "antd";
import "antd/dist/antd.css";
import "./CreatePollPage.css";
import { Link } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom"; //useNavigate
import Navbar from "../components/Nabvar";

function CreatePollPage(props) {
    let { pageState, setPageState } = useContext(PageWrapper); //useContext
    // so now we can access pageState.loggedInUserId and pageState.eventId //useContext

    console.log("************* CreatePollPage - pageState:", pageState); //useContext

    const loggedInUserId = props.loggedInUserId;
    const { id } = useParams();
    const eventId = id; //re-assigning to a declarative name

    const [question, setQuestion] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");

    // const navigate = useNavigate(); //useNavigate - must set in top level in a component

    //let existingEventId = 8;
    //DONE - instead of hard-coding above, take in eventId and pass it on
    //  once finished creating poll
    //redirect to event/id page for the same event
    //const url = " ";

    function handleQuestionChange(e) {
        setQuestion(e.target.value);
        console.log(question);
    }

    function handleOptionChange(e) {
        setOption1(e.target.value);
        console.log(option1);
    }

    function handleOptionChange2(e) {
        setOption2(e.target.value);
        console.log(option2);
    }

    function handleOptionChange3(e) {
        setOption3(e.target.value);
        console.log(option3);
    }

    // NOT IN USE ATM
    function handleSubmit(e) {
        e.preventDefault();

        console.log(
            "+++++++++++++++  In Create Poll - about to return to Display Event"
        );
        //useNavigate
        //navigate(`/Event/${existingEventId}`);

        // const poll = { question, option1, option2 };
        // const newPoll = {
        //     method: "POST",
        //     body: JSON.stringify(poll),
        //     headers: { "Content-Type": "application/json" },
        // };

        // fetch(url, newPoll)
        //     .then((res) => res.json())
        //     .then((res) => console.log(res));
        // console.log(poll);
    }

    return (
        <div>

            <Navbar loggedInUserId={loggedInUserId} />
            <form onSubmit={handleSubmit}>
                <div className="createpollpage-container">
                    <h2 className="Title">Create a poll</h2>
                    <input
                        placeholder="Set a question for your poll"
                        name="pollTitle"
                        className="pollTitle"
                        value={question}
                        onChange={handleQuestionChange}
                        type="text"
                    />
                    <input
                        placeholder="Option"
                        name="pollOption1"
                        className="pollOption1"
                        value={option1}
                        onChange={handleOptionChange}
                        type="text"
                    />
                    <input
                        placeholder="Option"
                        name="pollOption2"
                        className="pollOption2"
                        value={option2}
                        onChange={handleOptionChange2}
                        type="text"
                    />

                    <input
                        placeholder="Option"
                        name="pollOption3"
                        className="pollOption3"
                        value={option3}
                        onChange={handleOptionChange3}
                        type="text"
                    />
                </div>


                <Link to={`/Event/${pageState.eventId}`}>
                    <button className="createPollButton">Create Poll</button>
                </Link>
            </form>
        </div>
    );
}

export default CreatePollPage;

//<Link to={"/createEvent"} key="2-Link"></Link>

// <Link to={`/Event/${eventId}`}>
//     <Button className="createPollButton">Create Poll</Button>
// </Link>;
