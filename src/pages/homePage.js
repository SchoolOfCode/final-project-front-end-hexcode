import React from "react";
import Navbar from "../components/Nabvar";
import havingfun from "../images/havingfun.png";
import radunoTitle from "../images/radunoTitle.png";

function HomePage(props) {
    const loggedInUserId = props.loggedInUserId; //coming from App/index.js

    return (
        <div>
            <Navbar loggedInUserId={loggedInUserId} />

            <img src={radunoTitle} alt="background" className="logo" />

            <section>
                <p>raduno</p>
                <p>noun</p>
                <p>assembly, gathering, rally</p>
            </section>

            <img src={havingfun} alt="background" className="havingfun" />
        </div>
    );
}

export default HomePage;

//changed import name at the top to be nabvar
