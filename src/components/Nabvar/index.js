import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose, AiFillPlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Navbar.css";

import { API_URL } from "../../config/index.js";

function Navbar(props) {
    // props - warning - not necessarily filled on first render, so beware in fetch requests
    const loggedInUserId = props.loggedInUserId; //coming from App/index.js, via <Event>, <HomePage> or <CreateEvent>
    // const [localLoggedInUserIdState, setLocalLoggedInUserIdState] =
    //     useState(loggedInUserId);

    // console.log(
    //     `/src/components/Nabvar/index.js - props - loggedInUserId= ${loggedInUserId}`
    // ); //07Mar SC: this prints out as 3, which is correct (logged in as akiko)
    // console.log(`/src/components/Nabvar/index.js - API_URL = ${API_URL}`);

    // States
    const [sidebar, setSidebar] = useState(false);
    const [userEvents, setUserEvents] = useState(false);

    // UseEffect fetch request to get events based on userId
    useEffect(() => {
        console.log(
            `src/components/Navbar/index.js - useEffect START. loggedInUserId= ${loggedInUserId}`
        );

        async function getEvent() {
            console.log(
                `src/components/Navbar/index.js - getEvent START. loggedInUserId= ${loggedInUserId}`
            );

            const response = await fetch(
                // `${API_URL}/events`
                `${API_URL}/appusers/${loggedInUserId}/events`
            );

            // console.log(
            //     `src/components/Navbar/index.js - END POINT USED IS = ${API_URL}/events`
            // );
            // console.log(
            //     `src/components/Navbar/index.js - END POINT WE SHOULD USE IS = ${API_URL}/appusers/${loggedInUserId}/events`
            // );
            // console.log(
            //     `/src/components/Nabvar/index.js - props - loggedInUserId (should be same)= ${loggedInUserId}`
            // ); //07Mar SC: but this prints out as empty string, which is weird
            // console.log(
            //     `/src/components/Nabvar/index.js - lets test saving loggedInUserId in localLoggedInUserIdState= ${localLoggedInUserIdState}`
            // );
            // const response = await fetch(
            //     `${API_URL}/appusers/${loggedInUserId}/events`
            // );
            const data = await response.json();
            setUserEvents(data.payload);

            // console.log(
            //     `src/components/Navbar/index.js - useEffect: UserEvents state afterfetch and update:`
            // );
            // console.log(userEvents);
        }
        //only do the fetch if the loggedInUserId has already been filled in the props:
        if (!(loggedInUserId === "")) getEvent();
    }, [loggedInUserId, sidebar]);
    // }, [sidebar]);
    //and now run useEffect when either the loggedInUserId is (finally) filled, or when the sidebar is shown again (in case a new event has been added in the meantime)

    function showSidebar(e) {
        setSidebar(!sidebar);
    }

    return (
        <div>
            <div className="navbar">
                <Link to="#" className="menu-bars">
                    <FaBars onClick={showSidebar} />
                </Link>
            </div>
            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className="navbar-toggle" key="1">
                        <Link to="#" className="menu-bars" key="1-Link">
                            <AiOutlineClose />
                        </Link>
                    </li>

                    <li className="addEventbtn" key="2">
                        <Link to={"/createEvent"} key="2-Link">
                            <AiFillPlusCircle className="addButton" />
                        </Link>
                    </li>
                    <h4 key="H-your-events">Your Events</h4>
                    {!userEvents ? (
                        <div key="no-events">No user events</div>
                    ) : (
                        userEvents.map((item, index) => {
                            //map not neceessary YET- use as reference for when we map through user ID and associated events.
                            return (
                                <div key={item.eventId} className="userEvents">
                                    <Link
                                        to={`/Event/${item.eventId}`}
                                        key={item.eventId + "link"}
                                    >
                                        <p
                                            className="userEventsTitles"
                                            key={item.eventTitle}
                                        >
                                            {item.eventTitle}
                                        </p>
                                    </Link>
                                </div>
                            );
                        })
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
