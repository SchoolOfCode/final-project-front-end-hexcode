import React from "react";
import EventInformationSection from "../components/EventInformationSection";
import { useState, useEffect, useContext } from "react"; //useContext
import { PageWrapper } from "../components/App/index.js"; //useContext

// import useFetch from "../CustomHooks/customHooks"; // not used.
import { useParams } from "react-router-dom";

import Navbar from "../components/Nabvar";

import { API_URL } from "../config/index.js";

function Event(props) {
    // *** STATE  ***
    const [eventObject, setEventObject] = useState(false);
    const [errorHappened, setErrorHappened] = useState(false);

    // *** CONTEXT set up ***
    let { pageState, setPageState } = useContext(PageWrapper); //useContext - so now we can access pageState.loggedInUserId and pageState.eventId

    // *** PROPS - passed in from App/index.js  ***
    const loggedInUserId = props.loggedInUserId;

    // *** PARAMS - get from URL  ***
    const { id } = useParams();

    // useContext - IMPORTANT - only call setPageState if the eventId is different from that in the pageState - otherwise it gets into a loop with the useEffect below.
    if (pageState.eventId != id) {
        setPageState({ ...pageState, eventId: id }); // useContext
    }
    let eventId = 0;
    eventId = id; //re-assigning the incoming param, id, to a more declarative name, eventId

    //Whenever the Event ID changes, go to database and fetch the event details for that Event ID
    useEffect(() => {
        async function getEvent() {
            const response = await fetch(`${API_URL}/events/${eventId}`);

            // Error-checking: check response.ok - it will be false if HTTP Status code is 400, 401, 500 etc
            if (!response.ok) {
                console.log(
                    `src/pages/Event.js - getEvent: ERROR returned from GET Event`
                );
                setErrorHappened(true);
                //TODO: alert user of error and, return out from here instead of carrying on
            }

            // otherwise, carry on and attempt to set the event object TODO: only if response from fetch was okay
            const data = await response.json();
            const eventObjectFromDatabase = data.payload;

            // Error-checking: make sure an event object was retrieved (sinead: i think it should be - i updated server code - so response.ok would be false if there was no event object retrieved
            if (!eventObjectFromDatabase) {
                console.log(
                    `src/pages/Event.js - get Event: ERROR - empty eventObject`
                );

                // set a state to say error occurred, and return without attempting to set the event object state
                setErrorHappened(true);
                return;
            }

            // otherwise all good
            setEventObject(eventObjectFromDatabase); // FYI - this is now a SINGLE event object, not an array of objects, nor an array of a single object
        }

        // Only attempt to fetch the event if the eventId is not an empty string
        if (!(eventId === "")) {
            getEvent();
        }
    }, [eventId]);

    //TODO: wrap the return(jsx) inside this "if error has happened, then render something else, else render the usual"
    if (errorHappened) {
        console.log(
            `src/pages/Event.js: ERROR SECTION - NO EVENT FOUND - TODO: ALERT USER `
        ); // TODO: need to make sure this doesn't only render when there's a delay filling the event
    }
    //When the EventObject has been retrieved, then render the EventInformationSection component with it - TODO: put this inside the 'else if error has not happened'
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
}

export default Event;
