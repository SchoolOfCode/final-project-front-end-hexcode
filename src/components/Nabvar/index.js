import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose, AiFillPlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  // States
  const [sidebar, setSidebar] = useState(false);
  const [userEvents, setUserEvents] = useState(false);

  // UseEffect fetch request to get events based on userId
  useEffect(() => {
    async function getEvent() {
      const response = await fetch(
        "https://hexcode-arrange-group-event.herokuapp.com/events"
      );
      const data = await response.json();
      setUserEvents(data.payload);
      console.log("UserEvents State", userEvents);
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
          <FaBars onClick={showSidebar} />
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiOutlineClose />
            </Link>
          </li>

          <li className="addEventbtn">
            <Link to={"/createEvent"}>
              <AiFillPlusCircle />
            </Link>
          </li>
          <h4>Your Events</h4>
          {!userEvents ? (
            <div>No user events</div>
          ) : (
            userEvents.map((item, index) => {
              //map not neceessary YET- use as reference for when we map through user ID and associated events.
              return (
                <div key={item.id} className="userEvents">
                  <Link to={`/Event/${item.id}`}>
                    <p>{item.event_title}</p>
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
