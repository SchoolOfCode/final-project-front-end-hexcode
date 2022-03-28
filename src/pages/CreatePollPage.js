import React, { useState, useContext } from "react"; //useContext
import { PageWrapper } from "../components/App/index.js"; //useContext

import { useParams } from "react-router-dom";
import { Button } from "antd";
import "antd/dist/antd.css";
import "./CreatePollPage.css";
import { Link } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom"; //useNavigate - commented out because we returned to using just Link at the last minute because, when we siwtched from using Ant Design <Button> to a standard html <button>, the useNavigate didn't work well with it.
import Navbar from "../components/Nabvar";

function CreatePollPage(props) {
    console.log(`pages/CreatePollPage.js: START`);
    let { pageState, setPageState } = useContext(PageWrapper); //useContext  - so now we can access pageState.loggedInUserId and pageState.eventId

    const loggedInUserId = props.loggedInUserId;

    // Take in (event) id and, once new poll is saved, use to redirect back to event/id page for the same event
    const { id } = useParams();
    const eventId = id; // FYI: re-assigning the incoming param, id, to a more declarative name, eventId

    const [question, setQuestion] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");

    // const navigate = useNavigate(); //useNavigate - must set in top level in a component - commented out when we changed from <Button> to <button>

    //TODO: refactor  - replace handleChange events with useRef - cleaner.
    function handleQuestionChange(e) {
        setQuestion(e.target.value);
        //console.log(question);
    }

    function handleOptionChange(e) {
        setOption1(e.target.value);
        //console.log(option1);
    }

    function handleOptionChange2(e) {
        setOption2(e.target.value);
        //console.log(option2);
    }

    function handleOptionChange3(e) {
        setOption3(e.target.value);
        //console.log(option3);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("In Create Poll - about to return to Display Event");
        // navigate(`/Event/${existingEventId}`); //useNavigate - commented out when we changed from <Button> to <button>

        //TODO: create newPoll object from the state constants, and POST to the database
    }

    // useNavigate - removed and returned to using <Link> instead when we changed from <Button> to <button>
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
