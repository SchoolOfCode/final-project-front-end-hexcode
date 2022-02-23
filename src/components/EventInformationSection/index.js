import React from "react";
import OrganiserSection from "../OrganiserSection";
import PeopleSection from "../PeopleSection";
import ProfileImage from "../ProfileImage";
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
      <div className="dateAndLocation">
        <h3>
          {eventDate} @ {eventTime}
        </h3>
        <h3>{eventLocation}</h3>
      </div>
      <div>
        <h3>People</h3>
        {/* {eventPeople.map((item, index) {
        return <ProfileImage image={item.appUserProfilePicLink} key={index} />
      })} */}
        <button>Add People</button>
      </div>
      <div className="eventDescription">
        <p>{eventDescription}</p>
      </div>
      <div className="collapseSection">
        <button>Collapse</button>
      </div>
      <div className="pollSection"></div>
    </div>
  );
}

export default EventInformationSection;
