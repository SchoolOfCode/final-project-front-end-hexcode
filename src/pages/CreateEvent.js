import React from "react";
import CreateEventSection from "../components/CreateEventSection";
import Navbar from "../components/Nabvar";

function CreateEvent(props) {
    const loggedInUserId = props.loggedInUserId; //coming from App/index.js

    return (
        <div>
            <Navbar loggedInUserId={loggedInUserId} />
            <CreateEventSection loggedInUserId={loggedInUserId} />
        </div>
    );
}

export default CreateEvent;
