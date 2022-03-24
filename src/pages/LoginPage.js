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

    function handleSubmit(e) {
        e.preventdefault();
    }

    // TODO: refactor  - replace handleChange events with useRef - cleaner.
    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

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
                    onClick={() => handleLoginClick(email)}
                >
                    Login
                </Button>
            </Link>

            <Button className="signupbutton">Sign Up</Button>
        </div>
    );
}
// TODO: Currently the sign up button doesn't do anything.

export default LoginPage;
