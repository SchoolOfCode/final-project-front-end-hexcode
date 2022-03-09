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
    console.log(`src/components/OrganiserSection: incoming props. organiserName=${organiserName}
    organiserProfilePicLink=${organiserProfilePicLink}
    organiserUserId=${organiserUserId}`);
    // 06Mar SC: changing Ivan Smith to Belinda Duffy to match the back end data we'll be retrieving (9because the photos are set to match the back-end seed data, so 1st photo is female)
    // 06Mar SC: Also, the call to <ProfileImage /> is missing its parameter, so adding that in.
    // NB
    return (
        <div className="organiser-container">
            <ProfileImage imageFileNumber={organiserUserId} />
            <h3 className="organiser">{organiserName}</h3>
            <button className="cog-button">
                <FiSettings />
            </button>
        </div>
    );
    //old code - before integration with back end
    // return (
    //     <div className="organiser-container">
    //         <ProfileImage imageFileNumber={1} />
    //         <h3 className="organiser">Belinda Duffy</h3>
    //         <button className="cog-button">
    //             <FiSettings />
    //         </button>
    //     </div>
    // );
}

export default OrganiserSection;
