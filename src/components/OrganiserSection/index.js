import React from "react";
import ProfileImage from "../ProfileImage";
import { FiSettings } from "react-icons/fi";
import "../OrganiserSection/OrganiserSection.css";
import "../EventInformationSection/EventInfo.css";

function OrganiserSection({ eventOrganiser }) {
  return (
    <div className="organiser-container">
      <ProfileImage />
      <h3 className="organiser">Ivan Smith</h3>
      <button className="cog-button">
        <FiSettings />
      </button>
    </div>
  );
}

export default OrganiserSection;
