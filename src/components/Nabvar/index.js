import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

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
          {SidebarData.map((item, index) => {
            //map not neceessary YET- use as reference for when we map through user ID and associated events.
            return (
              <li key={index} className={item.className}>
                <Link to={item.path}>{item.icon}</Link>
              </li>
            );
          })}
          <h4>Your Events</h4>
          <button className="eventButton">
            <li> Pub Crawl</li>
          </button>
          <button className="eventButton">
            <li>Lunch With The Girls</li>
          </button>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
