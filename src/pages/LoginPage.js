import React from 'react';

function LoginPage() {
  return (
    <div>
      <h2>Event Planner App</h2>
      <form>
        {/* pass in appUserEmail to the API tbc, Get back appUserId - HandleClick for login*/}

        <input placeholder='e-mail' />

        <input placeholder='password' />

        <button>Login</button>

        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default LoginPage;
