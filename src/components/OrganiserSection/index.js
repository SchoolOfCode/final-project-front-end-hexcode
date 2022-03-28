import React from "react";
import ProfileImage from "../ProfileImage";
import { FiSettings } from "react-icons/fi";
import "../OrganiserSection/OrganiserSection.css";
import "../EventInformationSection/eventInfo.css";

function OrganiserSection({
    organiserName,
    organiserProfilePicLink,
    organiserUserId,
}) {
    console.log(`components/OrganiserSection/index.js: START`);
    // console.log(`components/OrganiserSection/index.js: incoming props. organiserName=${organiserName}
    // organiserProfilePicLink=${organiserProfilePicLink}
    // organiserUserId=${organiserUserId}`);
    return (
        <div className="organiser-container">
            <ProfileImage imageFileNumber={organiserUserId} />
            <h3 className="organiser">{organiserName}</h3>
            <button className="cog-button">
                <FiSettings />
            </button>
        </div>
    );
}

export default OrganiserSection;
