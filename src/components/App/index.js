import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";

//import Navbar from '../Nabvar';
import CreateEvent from "../../pages/CreateEvent";
import Event from "../../pages/Event";
import "antd/dist/antd.css";
import LoginPage from "../../pages/LoginPage";
import HomePage from "../../pages/homePage";
import "./app.css";

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
        const response = await fetch(`${API_URL}${API_END_POINT}${userEmail}`);
        const data = await response.json(response);
        console.log(
            `src/components/App/index.js: data object returned from fetch from | ${API_URL}${API_END_POINT}${userEmail} | =`
        );
        console.log(data);
        //TODO: change appUserid to appUserId when backend bug is fixed
        //setLoggedInUserId(data.payload[0].appUserId);
        setLoggedInUserId(data.payload[0].appUserid);
        setLoggedInUserEmail(data.payload[0].appUserEmail);
        setLoggedInUserHasAccount(data.payload[0].appUserHasAccount);
        setLoggedInUserFirstName(data.payload[0].appUserFirstName); //sets loggedInUserFirstName
        setLoggedInUserLastName(data.payload[0].appUserLastName);
        const fullName =
            data.payload[0].appUserFirstName + data.payload[0].appUserLastName;
        setLoggedInUserName(data.payload[0].fullName);
        setLoggedInUserProfilePicLink(data.payload[0].appUserProfilePicLink);
    }

    //DONE -  pass the handleLoginClick function into the login page, so that, when the login button is clicked, it gets triggered.
    //TODO: step 4 is passing that loggedinUserId etc state(s) to other pages/componenets as needed - start with the Navbar, so it can select the events based on the correct user

    //      - TODO: pass to CreateEvent page, to pass through to CreateEventSection - so that the (1) logged-in-user's (who is now the Organiser as well) contacts can be fetched and (2) so that the loggedin user id can be sent inot the POST event as the oragniserUserId

    //      - TODO: pass to (Display) Event page to pass on to the EventInformationSection - so that (1) the loggedinuser's Name and Profile Pic are displayed (2) relevant contacts are listed in the dropdown to add more invitees (TBC)

    //      - TODO: pass to NavBar so that it can get the events specific to the logged in user (instead of all events!)
    //              in order to get the user object (state) into Nav bar, we need to pass it through
    //                    (a)TODO: homepage
    //                    (b)TODO: create event page) and
    //                    (c)TODO: (display) event page

    // loggedInUserIdLoggedInUserId = {loggedInUserIdLoggedInUserId}
    // loggedInUserEmailLoggedInUserEmail = {loggedInUserEmailLoggedInUserEmail}
    // loggedInUserHasAccountLoggedInUserHasAccount  = {loggedInUserHasAccountLoggedInUserHasAccount}
    // loggedInUserFirstNameLoggedInUserFirstName  = {loggedInUserFirstNameLoggedInUserFirstName}
    // loggedInUserLastNameLoggedInUserLastName = {loggedInUserLastNameLoggedInUserLastName}
    // loggedInUserNameLoggedInUserName = {loggedInUserNameLoggedInUserName}
    // loggedInUserProfilePicLink = {loggedInUserProfilePicLink}

    // const  {
    //     loggedInUserIdLoggedInUserId,
    //     loggedInUserEmailLoggedInUserEmail,
    //     loggedInUserHasAccountLoggedInUserHasAccount ,
    //     loggedInUserFirstNameLoggedInUserFirstName ,
    //     loggedInUserLastNameLoggedInUserLastName ,
    //     loggedInUserNameLoggedInUserName ,
    //     loggedInUserProfilePicLink ,
    // } = {...props}

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
                    <Route path="/homepage" element={<HomePage />} />

                    <Route path="/createEvent" element={<CreateEvent />} />
                    <Route path="/event/:id" element={<Event />} />
                    {/* <Route path='/' />
          <Route path='/createEvent' element={<CreateEvent />} />
          <Route path='/event/:id' element={<Event />} /> */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
console.log("src/components/App/index.js: completed ");
