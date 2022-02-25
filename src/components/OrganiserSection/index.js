import React from "react";
import ProfileImage from "../ProfileImage";
import { FiSettings } from "react-icons/fi";

function OrganiserSection({ eventOrganiser }) {
  return (
    <div>
      <ProfileImage />
      <h3>{eventOrganiser}</h3>
      <button>
        <FiSettings />
      </button>
    </div>
  );
}

export default OrganiserSection;
