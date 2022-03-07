import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CreatePollPage";
import loginimage from "../images/loginimage.png";
import "./LoginPage.css";
import { Button } from "antd";
import "antd/dist/antd.css";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [userId, setUserId] = useState("")

    // function postData() {
    //   async function postUserData() {

    //   };
    //   const response = await fetch(
    //     '',
    //     {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify(),
    //     }
    //   );

    function handleSubmit(e) {
        e.preventdefault();
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }
    console.log(setEmail);

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    return (
        <div className="loginpage-container">
            <h2 className="Title">Raduno!</h2>
            <h3 className="tagLine">Catch up without the fuss</h3>
            <div className="titlepic">
                <img src={loginimage} alt="people" />
            </div>
            <div className="formcontainer">
                <form className="form">
                    {/* pass in appUserEmail to the API tbc, Get back appUserId - HandleClick for login*/}

                    <input
                        type="email"
                        placeholder="e-mail"
                        value={email}
                        onChange={handleChangeEmail}
                        className="form-input"
                    />

                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={handleChangePassword}
                        className="form-input"
                    />
                </form>
            </div>
            <Link to="/homepage">
                <Button className="loginbutton">Login</Button>
            </Link>

            <Button className="signupbutton">Sign Up</Button>
        </div>
    );
}

export default LoginPage;
