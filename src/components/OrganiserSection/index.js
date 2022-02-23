import React from "react";
import ProfileImage from "../ProfileImage";
function OrganiserSection({ eventOrganiser }) {
  return (
    <div>
      <ProfileImage />
      <h3>{eventOrganiser}</h3>
      <button>Settings</button>
    </div>
  );
}

export default OrganiserSection;
