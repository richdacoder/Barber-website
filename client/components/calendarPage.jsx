import { useState } from 'react';
import ReactCalendar from 'react-calendar'; // avoid naming conflict
import 'react-calendar/dist/Calendar.css';
import '../css/CalendarPage.css'; // optional for custom styling

const CalendarPage = () => {
  const [date, setDate] = useState(new Date()); // React state for selected date
  const today = new Date(); // current date

  // You could later send this date to your backend API when submitting an appointment

  return (
    <div className="calendar-container">
      <h2>Select a Date</h2>
      <ReactCalendar
         onChange={setDate}   // updates React state when user selects a date
         value={date}         // controlled component
         nextLabel="▶"        // custom right arrow
         prevLabel="◀"        // custom left arrow
         minDate={today}      // disables past dates
         showNeighboringMonth={true}
      />
      <p>Selected date: {date.toDateString()}</p>
    </div>
  );
};

export default CalendarPage;
