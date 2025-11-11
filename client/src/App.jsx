import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BookNow from '../components/booknow';
import CalendarPage from '../components/calendarPage';

function App() {
  return (
    <div>
      <Navbar />


      <Routes>
        <Route path="/" element={<BookNow />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </div>
  );
}

export default App;
