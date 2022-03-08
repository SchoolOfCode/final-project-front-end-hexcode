import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose, AiFillPlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Navbar.css";
const API_URL = "https://hexcode-safety-net-server.herokuapp.com";

//07Mar SC: adding comment to force prettier to update
function Navbar() {
    // States
    const [sidebar, setSidebar] = useState(false);
    const [userEvents, setUserEvents] = useState(false);

    // UseEffect fetch request to get events based on userId
    useEffect(() => {
        async function getEvent() {
            const response = await fetch(
                // "https://hexcode-safety-net-server.herokuapp.com/events"
                `https://hexcode-arrange-group-event.herokuapp.com/events`
            );
            const data = await response.json();
            setUserEvents(data.payload);

            console.log(
                `src/components/Navbar/index.js - useEffect: UserEvents state afterfetch and update:`
            );
            console.log(userEvents);
        }
        getEvent();
    }, [sidebar]);

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
                                        key="x-Link"
                                    >
                                        <p key={item.eventTitle}>
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

console.log("Hello");
