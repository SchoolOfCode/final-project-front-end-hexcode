import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../Nabvar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
console.log("hello");
