import React, { useState } from "react";
import { Link } from "react-router-dom";

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
    <div>
      <h2>Event Planner App</h2>
      <form>
        {/* pass in appUserEmail to the API tbc, Get back appUserId - HandleClick for login*/}

        <input
          placeholder="e-mail"
          value={email}
          onChange={handleChangeEmail}
        />

        <input
          placeholder="password"
          value={password}
          onChange={handleChangePassword}
        />
        <Link to="/homepage">
          <button>Login</button>
        </Link>

        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default LoginPage;
