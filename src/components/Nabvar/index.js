import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  function showSidebar(e) {
    setSidebar(!sidebar);
  }

  return (
    <div>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <FaBars onClick={() => showSidebar} />
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiOutlineClose />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
