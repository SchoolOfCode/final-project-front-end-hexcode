import React from "react";
import "../EventInformationSection/eventInfo.css";
import image1 from "../../images/1.png";
import image2 from "../../images/2.png";
import image3 from "../../images/3.png";
import image4 from "../../images/4.png";
import image5 from "../../images/5.png";
import image6 from "../../images/6.png";
import image7 from "../../images/7.png";
import image8 from "../../images/8.png";
import image9 from "../../images/9.png";

function ProfileImage({ imageFileNumber }) {
    //06Mar SC: temp way of getting pictures printing until we can figure out correct way:
    //          yes, i tried concatenating "image" + image to create imageFileName and assigning src to that, but i couldn't get it to work
    // const imageFileName = "image" + imageFileNumber;
    // console.log(
    //     `src/components/ProfileImage/index.js: imageFileName= ${imageFileName}`
    // );

    switch (imageFileNumber) {
        case 1:
            return (
                <div className="profile-image">
                    <img className="profile-pic" src={image1} alt="" />
                </div>
            );
        case 2:
            return (
                <div className="profile-image">
                    <img className="profile-pic" src={image2} alt="" />
                </div>
            );
        case 3:
            return (
                <div className="profile-image">
                    <img className="profile-pic" src={image3} alt="" />
                </div>
            );
        case 4:
            return (
                <div className="profile-image">
                    <img className="profile-pic" src={image4} alt="" />
                </div>
            );
        case 5:
            return (
                <div className="profile-image">
                    <img className="profile-pic" src={image5} alt="" />
                </div>
            );
        case 6:
            return (
                <div className="profile-image">
                    <img className="profile-pic" src={image6} alt="" />
                </div>
            );
        case 7:
            return (
                <div className="profile-image">
                    <img className="profile-pic" src={image7} alt="" />
                </div>
            );
        case 8:
            return (
                <div className="profile-image">
                    <img className="profile-pic" src={image8} alt="" />
                </div>
            );
        case 9:
            return (
                <div className="profile-image">
                    <img className="profile-pic" src={image9} alt="" />
                </div>
            );
        default:
            return (
                <div className="profile-image">
                    <p></p>
                </div>
            );
    }

    // return (
    //     <div className="profile-image">
    //         <img className="profile-pic" src={image} alt="" />
    //     </div>
    // );
}

export default ProfileImage;
