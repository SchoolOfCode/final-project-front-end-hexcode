import React from "react";
import EventInformationSection from "../components/EventInformationSection";
import { useState, useEffect, useContext } from "react"; //useContext
import { PageWrapper } from "../components/App/index.js"; //useContext

// import useFetch from "../CustomHooks/customHooks";
import { useParams } from "react-router-dom";

import Navbar from "../components/Nabvar";

import { API_URL } from "../config/index.js";

function Event(props) {
    //STATE - N/A
    //CONTEXT
    let { pageState, setPageState } = useContext(PageWrapper); //useContext
    // so now we can access pageState.loggedInUserId and pageState.eventId //useContext
    console.log("******************** Event.js - pageState: ", pageState); //useContext

    //PROPS - coming from App/index.js
    const loggedInUserId = props.loggedInUserId;

    //PARAMS - from URL
    const { id } = useParams();

    //jordan: new event id comes back as part of 'data' - useContext
    if (pageState.eventId != id) {
        setPageState({ ...pageState, eventId: id });
    }
    let eventId = 0;
    eventId = id; //re-assigning to a declarative name
    // const eventId = pageState.eventId; //useContext
    console.log(
        `££££££££££££ Event.js pageState.eventId = ${pageState.eventId}`
    );

    console.log(`src/pages/Event.js: TOP OF PAGE id param= |${id}| `);
    console.log(`src/pages/Event.js: TOP OF PAGE eventId= |${eventId}| `);

    //STATES
    const [eventObject, setEventObject] = useState(false);
    const [errorHappened, setErrorHappened] = useState(false);

    //When the Event ID changes, go to database and fetch the event details for the given EventId
    useEffect(() => {
        console.log(`src/pages/Event.js - useEffect START. `);
        async function getEvent() {
            const response = await fetch(`${API_URL}/events/${eventId}`);
            //TODO: check http status code returned - response.ok could be true or false
            if (!response.ok) {
                console.log(
                    `src/pages/Event.js: fetch returned response.ok = false - Error.`
                );
                setErrorHappened(true);
                //TODO: alert user of error
            }
            //TODO: otherwise, only if no error, carry on and attempt to set userEvents array.
            const data = await response.json();
            console.log(`src/pages/Event.js: after fetch, data retrieved is: `);
            console.log(data);
            const eventObjectFromDatabase = data.payload;

            if (!eventObjectFromDatabase) {
                console.log(
                    `src/pages/Event.js: eventObject was expected to be filled, but it is not: `
                );
                console.log(eventObjectFromDatabase);
                // DONE - set a state to say error occurred
                setErrorHappened(true);
                return;
            }
            //otherwise all good
            setEventObject(eventObjectFromDatabase); //this is a SINGLE event object
            console.log(`src/pages/Event.js: inside getEvent. eventObject retrieved and state set, so the following variables should have values: eventId = ${eventObjectFromDatabase.eventId} organiserName= ${eventObjectFromDatabase.organiserName}
            organiserProfilePicLink=${eventObjectFromDatabase.organiserProfilePicLink}
            organiserUserId=${eventObjectFromDatabase.organiserUserId}`);
        }
        //Only attempt to fetch the event if the eventId is not an empty string
        console.log(
            `src/pages/Event.js: Inside useEffect typeof eventId= |${typeof eventId}| `
        );
        console.log(
            `src/pages/Event.js: Inside useEffect eventId= |${eventId}| `
        );

        if (!(eventId === "")) {
            console.log(
                `src/pages/Event.js - useEffect - going to call getEvent. `
            );

            getEvent();
        } else {
            console.log(
                `src/pages/Event.js - useEffect - FAILING to call getEvent. eventId=|${eventId}|`
            );
        }
        // WARNING typeof eventId = string.  Could check that it was not NAN?
        // if (typeof eventId === "number") {
        //     getEvent();
        // }
    }, [eventId]);

    //TODO: wrap return in if state - check if has error - then render something else
    if (errorHappened) {
        console.log(
            `src/pages/Event.js: ERROR SECTION - NO EVENT FOUND - TODO: ALERT USER `
        ); // need to make sure this doesn't just render when there's a delay filling the event
    }
    //When the EventObject has been retrieved, then render the EventInformationSection component with it
    //New code - have (hopefully) error checked above for blank objects
    // also added in organiser info - to display in Event Info section
    console.log(`src/pages/Event.js: rendering - organiserName=${eventObject.organiserName}
    organiserProfilePicLink=${eventObject.organiserProfilePicLink}
    organiserUserId=${eventObject.organiserUserId}`);

    return (
        <div>
            <Navbar loggedInUserId={loggedInUserId} />
            <div>
                <EventInformationSection
                    key={eventObject.eventId}
                    eventId={eventObject.eventId}
                    eventTitle={eventObject.eventTitle}
                    eventDescription={eventObject.eventDescription}
                    eventLocation={eventObject.eventLocation}
                    eventDate={eventObject.eventDate}
                    eventTime={eventObject.eventTime}
                    eventRequirements={eventObject.eventRequirements}
                    eventCategory={eventObject.eventCategory}
                    organiserUserId={eventObject.organiserUserId}
                    organiserEmail={eventObject.organiserEmail}
                    organiserFirstName={eventObject.organiserFirstName}
                    organiserLastName={eventObject.organiserLastName}
                    organiserName={eventObject.organiserName}
                    organiserProfilePicLink={
                        eventObject.organiserProfilePicLink
                    }
                    loggedInUserId={loggedInUserId}
                />
            </div>
        </div>
    );
    // old code - before event was returned as just an object, not an array of one item
    // return (
    //     <div>
    //         <Navbar loggedInUserId={loggedInUserId} />
    //         <div>
    //             {!eventObject ? (
    //                 <div>Event still being retrieved or not found...</div>
    //             ) : (
    //                 eventObject.map((currItem) => {
    //                     return (
    //                         <EventInformationSection
    //                             key={currItem.eventId}
    //                             eventTitle={currItem.eventTitle}
    //                             eventDescription={currItem.eventDescription}
    //                             eventLocation={currItem.eventLocation}
    //                             eventTime={currItem.eventTime}
    //                             eventDate={currItem.eventDate}
    //                         />
    //                     );
    //                 })
    //             )}
    //         </div>
    //     </div>
    // );
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
