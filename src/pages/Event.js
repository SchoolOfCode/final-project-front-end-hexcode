import React from "react";
import EventInformationSection from "../components/EventInformationSection";
import { useEffect, useState } from "react";
import useFetch from "../CustomHooks/customHooks";
import CommentSection from "../components/CommentSection";

function Event() {
  // const [data] = useFetch(
  //   "https://hexcode-arrange-group-event.herokuapp.com/events/2"
  // );

  const [event, setEvent] = useState(false);

  useEffect(() => {
    async function getEvent() {
      const response = await fetch(
        "https://hexcode-arrange-group-event.herokuapp.com/events/10"
      );
      const data = await response.json();
      console.log("Event data", data);
      setEvent(data.payload);
    }
    getEvent();
  }, []);

  return (
    <div>
      <div>
        {!event ? (
          <div className="hide">Cannot find the event you're looking for..</div>
        ) : (
          event.map((item, index) => {
            return (
              <EventInformationSection
                key={index}
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
      <div className="commentSection"></div>
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
