import React from "react";
import EventInformationSection from "../components/EventInformationSection";
import { useEffect } from "react";

function Event() {
  return (
    <EventInformationSection
      title={title}
      date={date}
      location={location}
      description={description}
    />
  );
}

export default Event;
