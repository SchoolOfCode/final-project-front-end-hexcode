import React from "react";
import Navbar from "../components/Nabvar";
import havingfun from "../images/havingfun.png";
import radunoL from "../images/radunoL.png";
import "./homePage.css";
import { FcSpeaker } from "react-icons/fc";
// import radunoTitle from "../images/radunoTitle.png";

function HomePage(props) {
    const loggedInUserId = props.loggedInUserId; //coming from App/index.js

    // const myStyle = {
    //     color: "black",
    //     fontFamily: "inherit",
    // };

    return (
        <div>
            <Navbar loggedInUserId={loggedInUserId} />
            {/* <img src={radunoTitle} alt="background" className="logo" /> */}

            <div className="definition">
                <div className="titleandSpeaker">
                    <h2 className="radunoTitle">raduno</h2>
                    <div className="speaker">
                        <FcSpeaker />
                    </div>
                </div>

                <p className="radunoNoun">
                    [<b>noun</b> : italian]{" "}
                </p>
                <p className="italianDef">(AZIONE / EVENTO)</p>
                <p className="engDef">assembly, gathering, rally</p>
            </div>
            <img src={havingfun} alt="background" className="havingfun" />
            <div className="aboutTheApp">
                <div className="aboutApp">
                    <p>
                        Have you tried meeting up with your mates but can never
                        seem to decide on the what, when and where?
                    </p>
                    <p>
                        Well don't worry, we've created
                        <i> Raduno! </i>
                        The app that allows you to <b>catch up</b> with your
                        friends and family <b>without the fuss</b>.
                    </p>
                    <p>
                        You can create and organise events by using polls to
                        agree when you're all free - no more umming and ahing!!!
                        Have a chat with everyone in the posts section too and
                        let them know how excited you are to finally plan a
                        successful event!
                    </p>
                    <p>
                        Click on the hamburger menu on the top right to start
                        creating your events!
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;

//changed import name at the top to be nabvar
