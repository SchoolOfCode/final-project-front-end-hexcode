import logo from "./logo.svg";
import "./App.css";
import InputBox from "../InputBox";
import HamburgerContainer from "../HamburgerContainer";
import { createEvent } from "@testing-library/react";
import CreatePollPage from "../../pages/CreatePollPage";

function App() {
  return (
    <div className="App">
      <HamburgerContainer />
      <CreateEvent />
      <CreatePollPage />
      <Event />
    </div>
  );
}

export default App;
console.log("hello");
