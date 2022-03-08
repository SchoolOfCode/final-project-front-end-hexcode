import React from "react";
import CreateEventSection from "../components/CreateEventSection";
import { Button } from "antd";
import Navbar from "../components/Nabvar";

function CreateEvent(props) {
    const loggedInUserId = props.loggedInUserId; //coming from App/index.js

    // console.log(
    //     `/src/pages/CreateEvent.js - props - loggedInUserId= ${loggedInUserId}`
    // );

    return (
        <div>
            <Navbar loggedInUserId={loggedInUserId} />
            <CreateEventSection loggedInUserId={loggedInUserId} />

            {/* <img className="background-container">
      </img> */}
        </div>
    );
}

export default CreateEvent;
