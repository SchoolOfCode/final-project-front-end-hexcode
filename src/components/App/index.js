import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Navbar from '../Nabvar';
import CreateEvent from '../../pages/CreateEvent';
import Event from '../../pages/Event';
import 'antd/dist/antd.css';
import LoginPage from '../../pages/LoginPage';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/homepage' />

          <Route path='/createEvent' element={<CreateEvent />} />
          <Route path='/event/:id' element={<Event />} />
          {/* <Route path='/' />
          <Route path='/createEvent' element={<CreateEvent />} />
          <Route path='/event/:id' element={<Event />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
console.log('hi');
