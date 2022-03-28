import React from "react";
import EventInformationSection from "../components/EventInformationSection";
import { useState, useEffect, useContext } from "react"; //useContext
import { PageWrapper } from "../components/App/index.js"; //useContext

// import useFetch from "../CustomHooks/customHooks"; // not used.
import { useParams } from "react-router-dom";

import Navbar from "../components/Nabvar";

import { API_URL } from "../config/index.js";

function Event(props) {
    console.log(`pages/Event.js: START`);

    // *** STATE  ***
    const [eventObject, setEventObject] = useState(false);
    const [errorHappened, setErrorHappened] = useState(false);

    // *** CONTEXT set up ***
    let { pageState, setPageState } = useContext(PageWrapper); //useContext - so now we can access pageState.loggedInUserId and pageState.eventId
    // let [pageState, setPageState] = useContext(PageWrapper); //useContext - so now we can access pageState.loggedInUserId and pageState.eventId

    // *** PROPS - passed in from App/index.js  ***
    const loggedInUserId = props.loggedInUserId;

    // *** PARAMS - get from URL  ***
    const { id } = useParams();

    // useContext - IMPORTANT - only call setPageState if the eventId is different from that in the pageState - otherwise it gets into a loop with the useEffect below.
    if (pageState.eventId != id) {
        console.log(
            `DEBUG: pages/Event.js: IMMEDIATELY BEFORE setPageState({ ...pageState, eventId: id });`
        );
        setPageState({ ...pageState, eventId: id }); // useContext
        // TODO: FIX the code above - it triggers the following warning:
        // react-dom.development.js:67 Warning: Cannot update a component (`App`) while rendering a different component (`Event`).
        // To locate the bad setState() call inside `Event`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
        // at Event (http://localhost:3000/static/js/bundle.js:3053:88)
        // at Routes (http://localhost:3000/static/js/bundle.js:223442:5)
        // at Router (http://localhost:3000/static/js/bundle.js:223375:15)
        // at BrowserRouter (http://localhost:3000/static/js/bundle.js:222855:5)
        // at div
        // at App (http://localhost:3000/static/js/bundle.js:67:94)
        console.log(
            `DEBUG: pages/Event.js: IMMEDIATELY AFTER setPageState({ ...pageState, eventId: id });`
        );
    }
    let eventId = 0;
    eventId = id; //re-assigning the incoming param, id, to a more declarative name, eventId

    //Whenever the Event ID changes, go to database and fetch the event details for that Event ID
    useEffect(() => {
        console.log(`DEBUG: pages/Event.js: useEffect START`);

        async function getEvent() {
            console.log(`DEBUG: pages/Event.js: useEffect->getEvent START`);

            const response = await fetch(`${API_URL}/events/${eventId}`);

            // Error-checking: check response.ok - it will be false if HTTP Status code is 400, 401, 500 etc
            if (!response.ok) {
                console.log(`pages/Event.js->getEvent: fetch ERROR`);
                setErrorHappened(true);
                //TODO: alert user of error and, return out from here instead of carrying on
            }

            // otherwise, carry on and attempt to set the event object TODO: only if response from fetch was okay
            const data = await response.json();
            const eventObjectFromDatabase = data.payload;

            // Error-checking: make sure an event object was retrieved (sinead: i think it should be - i updated server code - so response.ok would be false if there was no event object retrieved
            if (!eventObjectFromDatabase) {
                console.log(
                    `pages/Event.js->getEvent: ERROR fetched empty event`
                );

                // set a state to say error occurred, and return without attempting to set the event object state
                setErrorHappened(true);
                return;
            }

            // otherwise all good
            setEventObject(eventObjectFromDatabase); // FYI - this is now a SINGLE event object, not an array of objects, nor an array of a single object
            console.log(`DEBUG: pages/Event.js: useEffect->getEvent END`);
        }

        // Only attempt to fetch the event if the eventId is not an empty string
        if (!(eventId === "")) {
            getEvent();
        }
        console.log(`DEBUG: pages/Event.js: useEffect END`);
    }, [eventId]);

    //TODO: wrap the return(jsx) inside this "if error has happened, then render something else, else render the usual"
    if (errorHappened) {
        console.log(`src/pages/Event.js: ERROR errorHappened = true`); // TODO: need to make sure this doesn't only render when there's a delay filling the event
        // reset the error back to false.
        setErrorHappened(false);
        //TODO: do the stuff we need to do when you see an error -
    }
    console.log(`DEBUG: pages/Event.js: END (about to return JSX`);

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
