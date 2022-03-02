import React from "react";
import EventInformationSection from "../components/EventInformationSection";
import { useEffect, useState } from "react";
import useFetch from "../CustomHooks/customHooks";
import { useParams } from "react-router-dom";

import Navbar from "../components/Nabvar";

const API_URL = "https://hexcode-safety-net-server.herokuapp.com";
// `https://hexcode-arrange-group-event.herokuapp.com/events/${id}`;

function Event() {
  // const [data] = useFetch(
  //   "https://hexcode-arrange-group-event.herokuapp.com/events/2"
  // );
  const { id } = useParams();

  const [event, setEvent] = useState(false);

  useEffect(() => {
    async function getEvent() {
      const response = await fetch(
        // `https://hexcode-safety-net-server.herokuapp.com/events/${id}`
        `https://hexcode-arrange-group-event.herokuapp.com/events/${id}`
      );
      const data = await response.json();
      console.log("Event data", data);
      setEvent(data.payload);
    }
    getEvent();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div>
        {!event ? (
          <div className="hide">Cannot find the event you're looking for..</div>
        ) : (
          event.map((item, index) => {
            return (
              <EventInformationSection
                key={item.eventId}
                eventTitle={item.eventTitle}
                eventDescription={item.eventDescription}
                eventLocation={item.eventLocation}
                eventTime={item.eventTime}
                eventDate={item.eventDate}
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
