import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../Nabvar";
import CreateEvent from "../../pages/CreateEvent";
import Event from "../../pages/Event";
import "antd/dist/antd.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" />
          <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/event/:id" element={<Event />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
console.log("hi");
