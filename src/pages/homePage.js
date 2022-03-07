import React from "react";
import Navbar from "../components/Nabvar";
import RADUNO from "../images/RADUNO.png";

function HomePage() {
    return (
        <div>
            <Navbar />
            <div
                style={{
                    objectFit: "contain",
                    marginTop: 200,
                    marginLeft: 0,
                }}
            >
                <img src={RADUNO} alt="background" />
                {/* <img src={eventbackground} alt='background' /> */}
            </div>

            {/* <div
                style={{ backgroundImage: `url(${eventbackground})` }}
                alt='backgroundImage'
            >
                An image should be here
            </div> */}
        </div>
    );
}

export default HomePage;

//changed import name at the top to be nabvar
