import React, { useState } from "react";
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

import TestPoll from "../TestPoll/index.js"; // SINEAD TEMP CODE TESTING POLL

function EventInformationSection({
    eventTitle,
    eventDescription,
    eventLocation,
    eventDate,
    eventTime,
}) {
    const [collapse, setCollapse] = useState(false);

    function collapseInfo(e) {
        setCollapse(!collapse);
    }

    return (
        <div className="eventSection">
            <div className={!collapse ? "organiserSection" : "hide"}>
                <OrganiserSection />
            </div>
            <div className="titleAndConfirm">
                <div className="eventTitleSection">
                    <h2 className="eventTitle">{eventTitle}</h2>
                </div>
                <button className={!collapse ? "confirmButton" : "hide"}>
                    <GiConfirmed />
                </button>
                <button className={!collapse ? "crossButton" : "hide"}>
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
            <div className={!collapse ? "people-title-container" : "hide"}>
                <h3 className="peopleTitle">Attendees</h3>
                <button className="add-attendees-btn">
                    <AiFillPlusCircle />
                </button>
            </div>
            <div className={!collapse ? "people-container" : "hide"}>
                {/* 06 Mar SC: just a quick hack to get the different images showing, until we retrieve real invitee user ids from the database - changing item.imag to index + 1 (so we pass in the number 1 through 9) */}
                {photos.map((item, index) => {
                    return (
                        <ProfileImage imageFileNumber={index + 1} key={index} />
                    );
                })}
            </div>

            <div className={!collapse ? "eventDescription" : "hide"}>
                <p>{eventDescription}</p>
            </div>

            <div className={!collapse ? "testPoll" : "hide"}>
                <TestPoll />
            </div>

            <div className="collapseSection">
                <button className="arrow-btn" onClick={collapseInfo}>
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
