import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useContext, useState } from "react"; //useContext

//import Navbar from '../Nabvar';
import CreateEvent from "../../pages/CreateEvent";
import Event from "../../pages/Event";
import "antd/dist/antd.css";
import LoginPage from "../../pages/LoginPage";
import HomePage from "../../pages/homePage";
import "./app.css";
import CreatePollPage from "../../pages/CreatePollPage";

import { API_URL } from "../../config/index.js"; // FYI: the fetch will need the URL for the back end
const API_END_POINT = "/appusers/search?email="; // FYI: must fetch from this exact endpoint, plus email address to retrieve the logged-in-users details including the user ID.

export let PageWrapper = React.createContext(); //useContext - created PageWrapper variable - export so other pages lower down can import it.

function App() {
    const [loggedInUserId, setLoggedInUserId] = useState("");
    const [loggedInUserEmail, setLoggedInUserEmail] = useState("");
    const [loggedInUserHasAccount, setLoggedInUserHasAccount] = useState("");
    const [loggedInUserFirstName, setLoggedInUserFirstName] = useState("");
    const [loggedInUserLastName, setLoggedInUserLastName] = useState("");
    const [loggedInUserName, setLoggedInUserName] = useState("");
    const [loggedInUserProfilePicLink, setLoggedInUserProfilePicLink] =
        useState("");
    const [errorHappened, setErrorHappened] = useState(false);

    //useContext: created a state for context - this will be the whole global state
    const [pageState, setPageState] = useState({
        loggedInUserId: 0,
        eventId: 0,
        // TODO: add in other attributes in here that we want to be part of the useContext, and that we want accessible in child pages
    });

    // when login is clicked, fetch the (logged in) user details from the database for the email address entered
    // TODO: implement Auth0 first.
    async function handleLoginClick(userEmail) {
        const response = await fetch(`${API_URL}${API_END_POINT}${userEmail}`);

        // ERROR -CHECKING: check response.ok = true or false
        if (!response.ok) {
            console.log(
                `src/components/App/index.js: fetch returned response.ok = false - Error.`
            );
            setErrorHappened(true);
            //TODO: send appropriate message to user:
            // e.g. error under user control.
            //         response for 404 - hexcode - user not found for this email address - (user has control over this) - display message for use to recheck email, return to login page.
            //     otherwise - assume not under users' control,
            //         respond for 400 - hexcode - email query string parameter not found
            //         response for 500 - hexcode - server error -
            //         otherwise reponse is poay - and we know user is found!!!
            return;
        }
        const data = await response.json(response);

        // response.ok was true, so we know payload has a user object - no need for optional chaining, data.payload?.[0], plus we've got rid of the array.
        const loggedInUserObject = data.payload;

        //ERROR CHECKING:
        if (!loggedInUserObject) {
            console.log(
                `src/components/App/index.js: loggedInUserObject was expected to be filled, but weirdly is not: `
            );
            console.log(loggedInUserObject);
            setErrorHappened(true);
            // TODO: send appropriate message to user
            return;
        }

        //otherwise no errors, so update the state with the logged in user's information retrieved from the database:
        setLoggedInUserId(loggedInUserObject.appUserId);
        setLoggedInUserEmail(loggedInUserObject.appUserEmail);
        setLoggedInUserHasAccount(loggedInUserObject.appUserHasAccount);
        setLoggedInUserFirstName(loggedInUserObject.appUserFirstName);
        setLoggedInUserLastName(loggedInUserObject.appUserLastName);
        setLoggedInUserName(loggedInUserObject.appUserName);
        setLoggedInUserProfilePicLink(loggedInUserObject.appUserProfilePicLink);
    }

    if (errorHappened) {
        console.log(
            `src/components/App/index.js: ERROR SECTION - NO USER FOUND - TO DO - REDIRECT TO LOGIN `
        ); // TODO: need to make sure this doesn't just render when there's a delay filling user
        // TODO: at this point, redirect back to login page - so that the return(jsx) below only occurs if there has been NO error retrieving the logged-in-user details
    }

    //useContext: added PageWrapper tags, and links pageState, setPageState to that PageWrapper.
    return (
        <div className="App">
            <PageWrapper.Provider value={{ pageState, setPageState }}>
                <div className="nav-container"></div>
                <Router>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <LoginPage
                                    handleLoginClick={handleLoginClick}
                                />
                            }
                        />
                        <Route
                            path="/homepage"
                            element={
                                <HomePage loggedInUserId={loggedInUserId} />
                            }
                        />

                        <Route
                            path="/CreatePollPage"
                            element={
                                <CreatePollPage
                                    loggedInUserId={loggedInUserId}
                                />
                            }
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
            </PageWrapper.Provider>
        </div>
    );
}

export default App;
