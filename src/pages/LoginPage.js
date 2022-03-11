import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CreatePollPage";
import loginimage from "../images/loginimage.png";
import radunoL from "../images/radunoL.png";
import "./LoginPage.css";
import { Button } from "antd";
import "antd/dist/antd.css";

function LoginPage({ handleLoginClick }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // let loggedInUserId = 0; //TEMP - this will become a state variable, probably up in App/index.js

    //07Mar SC:
    // DONE - accept the handleLoginClick function as a prop.
    // DONE - add it to the onclick for login button', passing in the TEMP_EMAIL
    //- TODO: later update to pass in the email from state (email) - this is a bit more hassle for testing purposes as you have to type it correctly into the login each time.
    const TEMP_EMAIL = "belinda@belinda.com"; //TEMP - hardcoding correct email as first test

    function handleSubmit(e) {
        e.preventdefault();
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    //  FYI ONLY -LONGER BUT CLEARER VERSION
    // function handleLocalLoginClick(){
    //     handleLoginClick(email);
    // }
    console.log(`src/pages/LoginPage.js: EMAIL  : ${email}`);
    return (
        <div className="loginpage-container">
            <div className="radunoLogo">
                <img className="raduno-logo" src={radunoL} alt="Logo" />
            </div>
            <h3 className="tagLine">Catch up without the fuss</h3>
            <div className="titlepic">
                <img className="groupPic" src={loginimage} alt="people" />
            </div>
            <div className="formcontainer">
                <form className="form">
                    {/* pass in appUserEmail to the API tbc, Get back appUserId - HandleClick for login*/}

                    <input
                        id="email-field"
                        type="email"
                        placeholder="e-mail"
                        value={email}
                        onChange={handleChangeEmail}
                        className="form-input"
                    />

                    <input
                        id="password-field"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={handleChangePassword}
                        className="form-input"
                    />
                </form>
            </div>
            <Link to="/homepage">
                <Button
                    className="loginbutton"
                    // FYI ONLY -LONGER BUT CLEARER VERSION
                    // onClick={handleLocalLoginClick}
                    // but we are using more succinct fat-arrow version instead
                    // onClick={() => handleLoginClick(TEMP_EMAIL)}
                    onClick={() => handleLoginClick(email)}
                >
                    Login
                </Button>
            </Link>

            <Button className="signupbutton">Sign Up</Button>
        </div>
    );
}

export default LoginPage;
