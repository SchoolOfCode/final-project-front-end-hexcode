import React from "react";
import "../EventInformationSection/eventInfo.css";
import image1 from "../../images/1.png";

function ProfileImage() {
  return (
    <div className="profile-image">
      <img className="profile-pic" src={image1} alt="" />
    </div>
  );
}

export default ProfileImage;
