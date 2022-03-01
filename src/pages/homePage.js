import React from 'react';
import Navbar from '../components/Nabvar';
//import event-background from '../images/event-background.png';

function HomePage() {
  return (
    <div>
      <Navbar />
      {/* <div>
        <img src={eventbackground} alt='background' />
      </div> */}

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
