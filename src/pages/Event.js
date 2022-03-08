import React from "react";
import EventInformationSection from "../components/EventInformationSection";
import { useEffect, useState } from "react";
// import useFetch from "../CustomHooks/customHooks";
import { useParams } from "react-router-dom";

import Navbar from "../components/Nabvar";

import { API_URL } from "../config/index.js";

function Event(props) {
    //PROPS - coming from App/index.js
    const loggedInUserId = props.loggedInUserId;

    //PARAMS - from URL
    const { id } = useParams();
    const eventId = id; //re-assigning to a declarative name

    //STATES
    const [eventObject, setEventObject] = useState(false);

    //When the Event ID changes, go to database and fetch the event details for the given EventId
    useEffect(() => {
        async function getEvent() {
            const response = await fetch(`${API_URL}/events/${eventId}`);
            const data = await response.json();
            console.log(`src/pages/Event.js: after fetch, data retrieved is: `);
            console.log(data);

            setEventObject(data.payload);
        }
        //Only attempt to fetch the event if the eventId is not an empty string
        if (!(eventId === "")) getEvent();
    }, [eventId]);

    //When the EventObject has been retrieved, then render the EventInformationSection component with it
    return (
        <div>
            <Navbar loggedInUserId={loggedInUserId} />
            <div>
                {!eventObject ? (
                    <div>Event still being retrieved or not found...</div>
                ) : (
                    eventObject.map((currItem) => {
                        return (
                            <EventInformationSection
                                key={currItem.eventId}
                                eventTitle={currItem.eventTitle}
                                eventDescription={currItem.eventDescription}
                                eventLocation={currItem.eventLocation}
                                eventTime={currItem.eventTime}
                                eventDate={currItem.eventDate}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default Event;

// const [event, setEvent] = useState([
//   {
//     title: "",
//     description: "",
//     location: "",
//     time: "",
//     date: "",
//   },
// ]);

// console.log(data[0]);

// setEvent({
//   title: data[0].event_title,
//   description: data[0].event_description,
//   location: data.event_location,
//   time: data.event_time,
//   date: data.event_date,
// });

// return (
//   <EventInformationSection
//     eventTitle={event.title}
//     eventDescription={event.description}
//     // eventLocation={event.location}
//     // eventTime={event.time}
//     // eventDate={event.date}
//   />
// );
