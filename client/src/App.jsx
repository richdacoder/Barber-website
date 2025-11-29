import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/navbar';
import BookNow from '../components/booknow';
import CalendarPage from '../components/calendarPage';
import { ConfirmationPage } from "../components/appointment-components/ConfirmationPage";


function App() {
  return (
    <div>
      <Navbar />


      <Routes>
        <Route path="/" element={<BookNow />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </div>
  );
}

export default App;
