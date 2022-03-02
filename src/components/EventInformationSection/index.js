import React from "react";
import OrganiserSection from "../OrganiserSection";
import PeopleSection from "../PeopleSection";
import ProfileImage from "../ProfileImage";
import { GoLocation } from "react-icons/go";
import { BsCalendarCheck } from "react-icons/bs";
import { AiOutlineArrowUp, AiFillPlusCircle } from "react-icons/ai";
import CommentSection from "../CommentSection";
import { GiConfirmed } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import photos from "../../libs/data";

function EventInformationSection({
  eventTitle,
  eventDescription,
  eventLocation,
  eventDate,
  eventTime,
}) {
  return (
    <div className="eventSection">
      <div className="organiserSection">
        <OrganiserSection />
      </div>
      <div className="titleAndConfirm">
        <div className="eventTitleSection">
          <h2 className="eventTitle">{eventTitle}</h2>
        </div>
        <button className="confirmButton">
          <GiConfirmed />
        </button>
        <button className="crossButton">
          <ImCross />
        </button>
      </div>
      <div className="date">
        <BsCalendarCheck className="calendar" />
        <h3 className="eventDateTime">
          {eventDate} @ {eventTime}
        </h3>
      </div>
      <div className="location">
        <GoLocation className="locationIcon" />
        <h3 className="locationPlace">{eventLocation}</h3>
      </div>

      <div>
        <h3>People</h3>
        {photos.map((item, index) => {
          return <ProfileImage image={item.image} key={index} />;
        })}
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
      <div className="commentSection">
        <CommentSection />
      </div>
    </div>
  );
}

export default EventInformationSection;
