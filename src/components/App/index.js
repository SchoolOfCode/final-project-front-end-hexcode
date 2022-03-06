import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Navbar from '../Nabvar';
import CreateEvent from "../../pages/CreateEvent";
import Event from "../../pages/Event";
import "antd/dist/antd.css";
import LoginPage from "../../pages/LoginPage";
import HomePage from "../../pages/homePage";
import "./app.css";

function App() {
  return (
    <div className="App">
      <div className="nav-container"></div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/homepage" element={<HomePage />} />

          <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/event/:id" element={<Event />} />
          {/* <Route path='/' />
          <Route path='/createEvent' element={<CreateEvent />} />
          <Route path='/event/:id' element={<Event />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
console.log("src/components/App/index.js: completed");
