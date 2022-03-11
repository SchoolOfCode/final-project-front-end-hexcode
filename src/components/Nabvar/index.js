import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose, AiFillPlusCircle, AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import ProfileImage from "../ProfileImage";
import "./Navbar.css";


import { API_URL } from "../../config/index.js";

function Navbar(props) {
    // PROPS  - warning - not necessarily filled on first render, so beware in fetch requests
    const loggedInUserId = props.loggedInUserId; //coming from App/index.js, via <Event>, <HomePage> or <CreateEvent>

    // STATES
    const [sidebar, setSidebar] = useState(false);
    const [userEvents, setUserEvents] = useState(false);

    // UseEffect fetch request to get events based on userId
    useEffect(() => {
        async function getAllEventsforUser() {
            const response = await fetch(
                `${API_URL}/appusers/${loggedInUserId}/events`
            );
            //TODO: check http status code returned - response.ok could be true or false
            if (!response.ok) {
                //TODO: alert usre of error
            }
            //TODO: otherwise, only if no error, carry on and attempt to set userEvents array.
            const data = await response.json();
            setUserEvents(data.payload);
        }
        //NB: ONLY attempt to fetch all events for a given user id IF that user id is a number (and not undefined or null)
        console.log(
            `src/components/Nabvar/index.js: typeof loggedInUserId= |${typeof loggedInUserId}| and loggedInUserId= |${loggedInUserId}| `
        );

        if (typeof loggedInUserId === "number") {
            getAllEventsforUser();
        }
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
                    <FaBars className="hamburgerMenu" onClick={showSidebar} />
                </Link>
            </div>
            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className="navbar-toggle" key="1">
                    <Link to={"/homepage"}>
                    <AiOutlineHome className="homeIcon"/>
                    </Link>
                        <Link to="#" className="menu-bars" key="1-Link">
                            <AiOutlineClose className="close" />
                        </Link>
                    </li>
                    <div className="navbar-pic-section">

                    <ProfileImage 
                    imageFileNumber={loggedInUserId} 
                    id="profilePic"
                    />
                        
                    </div>
                    <div className="new-event-button">
                        <h4 key="H-your-events" className="yourEventsTitle">
                            YOUR EVENTS
                        </h4>
                        <li className="addEventbtn" key="2">
                            <Link to={"/createEvent"} key="2-Link">
                                <AiFillPlusCircle className="addButton" />
                            </Link>
                        </li>
                    </div>
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

//console.log("Hello");
