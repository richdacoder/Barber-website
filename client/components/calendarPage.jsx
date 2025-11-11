import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/CalendarPage.css'; // optional for custom styling

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = new Date();

  return (
    <div className="calendar-container">
      <h2>Select a Date</h2>
      <DatePicker
        selected={selectedDate}       // controlled component
        onChange={date => setSelectedDate(date)} // update state on selection
        inline                        // display calendar without input
        minDate={today}               // disable past dates
        calendarStartDay={0}          // Sunday as first day
        showMonthDropdown={true}      // optional: dropdown for month
        showYearDropdown={true}       // optional: dropdown for year
        dropdownMode="select"
      />
      <p>Selected date: {selectedDate.toDateString()}</p>
    </div>
  );
};

export default CalendarPage;
