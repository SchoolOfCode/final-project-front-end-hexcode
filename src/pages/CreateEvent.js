import React from "react";
import CreateEventSection from "../components/CreateEventSection";
import { Button } from "antd";
import Navbar from "../components/Nabvar";

function CreateEvent() {
  return (
    <div>

      <Navbar />
     

      <image className="background-container">
        <CreateEventSection />
      </image>

    </div>
  );
}

export default CreateEvent;
