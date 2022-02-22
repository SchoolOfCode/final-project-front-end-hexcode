import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../Nabvar';
import CreateEvent from '../../pages/CreateEvent';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' />
          <Route path='/createEvent' element={<CreateEvent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
console.log('hi');
