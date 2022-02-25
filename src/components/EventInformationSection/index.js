import React from "react";
import OrganiserSection from "../OrganiserSection";
import PeopleSection from "../PeopleSection";
import ProfileImage from "../ProfileImage";
import { GrLocation } from "react-icons/gr";
import { BsCalendarCheck } from "react-icons/bs";
import { AiOutlineArrowUp, AiFillPlusCircle } from "react-icons/ai";

function EventInformationSection({
  eventTitle,
  eventDescription,
  eventLocation,
  eventDate,
  eventTime,
}) {
  return (
    <div>
      <OrganiserSection />
      <div className="titleAndConfirm">
        <h2>{eventTitle}</h2>
        <button>Confirm Attendance</button>
      </div>
      <div className="date">
        <BsCalendarCheck />
        <h3>
          {eventDate} @ {eventTime}
        </h3>
      </div>
      <div className="location">
        <h3>{eventLocation}</h3>
        <GrLocation />
      </div>

      <div>
        <h3>People</h3>
        {/* {eventPeople.map((item, index) {
        return <ProfileImage image={item.appUserProfilePicLink} key={index} />
      })} */}
        <button>
          <AiFillPlusCircle />
        </button>
      </div>
      <div className="eventDescription">
        <p>{eventDescription}</p>
      </div>
      <div className="collapseSection">
        <button>
          <AiOutlineArrowUp />
        </button>
      </div>
      <div className="pollSection"></div>
    </div>
  );
}

export default EventInformationSection;
