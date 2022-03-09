import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";

//import Navbar from '../Nabvar';
import CreateEvent from "../../pages/CreateEvent";
import Event from "../../pages/Event";
import "antd/dist/antd.css";
import LoginPage from "../../pages/LoginPage";
import HomePage from "../../pages/homePage";
import "./app.css";
import CreatePollPage from "../../pages/CreatePollPage";

import { API_URL } from "../../config/index.js"; //the fetch will need the URL for the back end
const API_END_POINT = "/appusers/search?email="; //must fetch from this exact endpoint, plus email address to retrieve the logged-in-users details including the user ID.

//07Mar SC: adding comment to force prettier to update
function App() {
    //07Mar SC: TODO: add state for the loggedInUserObject  (or, at least, the loggedInUserId)
    const [loggedInUserId, setLoggedInUserId] = useState("");
    const [loggedInUserEmail, setLoggedInUserEmail] = useState("");
    const [loggedInUserHasAccount, setLoggedInUserHasAccount] = useState("");
    const [loggedInUserFirstName, setLoggedInUserFirstName] = useState("");
    const [loggedInUserLastName, setLoggedInUserLastName] = useState("");
    const [loggedInUserName, setLoggedInUserName] = useState("");
    const [loggedInUserProfilePicLink, setLoggedInUserProfilePicLink] =
        useState("");
    const [errorHappened, setErrorHappened] = useState(false);

    //TODO: context stuff
    // create context - once in app
    // provide context - once in app
    // (in destinations - consume context - once per every Component

    // DONE step 1 - can just be to get it to print out a console.log message - to make sure login page is triggering it correctly
    // DONE step 0 - take in the API-URL
    // DONE step 2 -   get the fetch working and printing the payload to console.log
    // DONE step 3 - introduce state, and save the fetch results (loggedinUserId) to state
    // DONE  Add a handleLoginClick function here that takes in an email as a prop
    //          This function will be triggered in LoginPage.js by the login button event

    async function handleLoginClick(userEmail) {
        console.log(
            `src/components/App/index.js: in handleLoginClick() function with userEmail = ${userEmail}`
        );
        // DONE fetch the (logged in) user from the database for that email.

        console.log(
            `src/components/App/index.js: about to fetch from | ${API_URL}${API_END_POINT}${userEmail} |`
        );
        const response = await fetch(`${API_URL}${API_END_POINT}${userEmail}`);

        //check response.ok = true or false
        if (!response.ok) {
            console.log(
                `src/components/App/index.js: fetch returned response.ok = false - Error.`
            );
            //  DONE - set a state to say error occurred
            setErrorHappened(true);
            //TODO: send relevant message to user:
            // error under user control.
            //        response for 404 - hexcode - user not found for this email address - (user has control over this) - display message for use to recheck email, return to login page.
            // otherwise - assume not under users' control,
            //      respond for 400 - hexcode - email query string parameter not found
            //      response for 500 - hexcode - server error -
            //      otherwise reponse is poay - and we know user is found!!!
        } else {
            const data = await response.json(response);

            console.log(`src/components/App/index.js: user object returned =`);
            console.log(data);
            //setLoggedInUserId(data.payload[0].appUserId);
            // if (typeof data.payload[0].appUserId === "number")  // TODO: think about NAN

            //FYI - optional chaining is like this:    ?.[]
            // const loggedInUserObject = data.payload?.[0]; //have got rid of the array on back end
            // response.ok so we know payload has a user object
            const loggedInUserObject = data.payload;

            //TEMP ERROR CHECKING
            if (!loggedInUserObject) {
                console.log(
                    `src/components/App/index.js: loggedInUserObject was expected to be filled, but weirdly is not: `
                );
                console.log(loggedInUserObject);
                // DONE - set a state to say error occurred
                setErrorHappened(true);
                return;
            }
            setLoggedInUserId(loggedInUserObject.appUserId);
            setLoggedInUserEmail(loggedInUserObject.appUserEmail);
            setLoggedInUserHasAccount(loggedInUserObject.appUserHasAccount);
            setLoggedInUserFirstName(loggedInUserObject.appUserFirstName);
            setLoggedInUserLastName(loggedInUserObject.appUserLastName);
            setLoggedInUserName(loggedInUserObject.appUserName);
            setLoggedInUserProfilePicLink(
                loggedInUserObject.appUserProfilePicLink
            );

            //check first if loggedInUserObject is null/undefined and only if it exists, then check if appUserid is a number ...
            // if (typeof loggedInUserObject?.appUserId === "number") {
            // }

            // if (data.payload[0].appUserId === undefined) {
            //     setLoggedInUserId(5); //DONE-  TEMP - need to use proper errorchecking - and potentially return to login page here
            //     console.log(
            //         `src/components/App/index.js: USER IS NOT YET IS NOT FETCHED for email = ${userEmail}. User Id set to 5, Luke`
            //     );
            // } else {
            //     // setLoggedInUserId(data.payload[0].appUserid);
            //     //08Mar SC: fixed backend bug that returned appUserid instead of appUserId. Okay on safety-net.
            //     setLoggedInUserId(data.payload[0].appUserId);
            // }

            // setLoggedInUserId(data.payload[0].appUserId);
            // setLoggedInUserEmail(data.payload[0].appUserEmail);
            // setLoggedInUserHasAccount(data.payload[0].appUserHasAccount);
            // setLoggedInUserFirstName(data.payload[0].appUserFirstName); //sets loggedInUserFirstName
            // setLoggedInUserLastName(data.payload[0].appUserLastName);
            // const fullName =
            //     data.payload[0].appUserFirstName +
            //     data.payload[0].appUserLastName;
            // setLoggedInUserName(data.payload[0].fullName);
            // setLoggedInUserProfilePicLink(
            //     data.payload[0].appUserProfilePicLink
            // );
        }
    }

    //DONE -  pass the handleLoginClick function into the login page, so that, when the login button is clicked, it gets triggered.

    //TODO: step 4 is passing that loggedinUserId etc state(s) to other pages/componenets as needed

    //      - TODO: pass to CreateEvent page, to pass through to CreateEventSection - so that the (1) logged-in-user's (who is now the Organiser as well) contacts can be fetched and (2) so that the loggedin user id can be sent inot the POST event as the oragniserUserId

    //      - TODO: pass to (Display) Event page to pass on to the EventInformationSection - so that (1) the loggedinuser's Name and Profile Pic are displayed (2) relevant contacts are listed in the dropdown to add more invitees (TBC)

    //      - DONE pass to NavBar so that it can get the events specific to the logged in user (instead of all events!)

    //      -  DONE - pass to HomePage, - not currently needed - but might be if we decide to show data specific to loggedin user eg manage profile, manage contacts etc

    // KEEP THESE JUST TO MAKE IT FASTER TO ADD THEM AS PROPS BELOW IF NEEDED:
    // loggedInUserId = {loggedInUserId}
    // loggedInUserEmailLoggedInUserEmail = {loggedInUserEmailLoggedInUserEmail}
    // loggedInUserHasAccountLoggedInUserHasAccount  = {loggedInUserHasAccountLoggedInUserHasAccount}
    // loggedInUserFirstNameLoggedInUserFirstName  = {loggedInUserFirstNameLoggedInUserFirstName}
    // loggedInUserLastNameLoggedInUserLastName = {loggedInUserLastNameLoggedInUserLastName}
    // loggedInUserNameLoggedInUserName = {loggedInUserNameLoggedInUserName}
    // loggedInUserProfilePicLink = {loggedInUserProfilePicLink}

    //TODO: wrap retrun in if state - check if has error - then render something else, eg redirect to login page
    if (errorHappened) {
        console.log(
            `src/components/App/index.js: ERROR SECTION - NO USER FOUND - TO DO - REDIRECT TO LOGIN `
        ); // need to make sure this doesn't just render when there's a delay filling user
    }
    return (
        <div className="App">
            <div className="nav-container"></div>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <LoginPage handleLoginClick={handleLoginClick} />
                        }
                    />
                    <Route
                        path="/homepage"
                        element={<HomePage loggedInUserId={loggedInUserId} />}
                    />

                    <Route
                        path="/CreatePollPage"
                        element={<CreatePollPage />}
                    />
                    <Route
                        path="/createEvent"
                        element={
                            <CreateEvent loggedInUserId={loggedInUserId} />
                        }
                    />
                    <Route
                        path="/event/:id"
                        element={<Event loggedInUserId={loggedInUserId} />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
console.log("src/components/App/index.js: completed ");
