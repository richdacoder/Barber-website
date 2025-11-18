import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/CalendarPage.css';

import useFetchSlots from './calendar-components/use-effect';
import TimeSlots from './calendar-components/time-slots';
import AppointmentForm from './calendar-components/appointment-form';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  // UI highlight
  const [selectedButtonId, setSelectedButtonId] = useState(null);

  // Database numeric slotId
  const [selectedSlotId, setSelectedSlotId] = useState(null);

  // Fetch available slots when date changes
  useFetchSlots({ selectedDate, setLoading, setTimeSlots, setSelectedSlotId });

  // Handle clicking a timeslot button
  const handleSelectButton = (timeButton) => {
    // Highlight clicked button
    setSelectedButtonId(timeButton.buttonId);

    // Store numeric slotId for database
    setSelectedSlotId(timeButton.slotId);
  };

  // Handle form submission
  const handleFormSubmit = (formData) => {
    console.log('Form Data:', formData);
    console.log('Selected numeric slotId for DB:', selectedSlotId);

    // Reset highlight and numeric slot after submission
    setSelectedSlotId(null);      // DB value
    setSelectedButtonId(null);    // UI highlight
  };

  return (
    <div className="calendar-container">
      <h2>Select a Date</h2>

      <DatePicker
        selected={selectedDate}
        onChange={setSelectedDate}
        inline
        minDate={new Date()}
        calendarStartDay={0}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />

      <p className="selected-date">Selected date: {selectedDate.toDateString()}</p>

      <TimeSlots
        loading={loading}
        timeSlots={timeSlots}
        selectedButtonId={selectedButtonId}
        handleSelectButton={handleSelectButton}
      />

      <AppointmentForm
        selectedSlotId={selectedSlotId} // numeric for DB
        selectedDate={selectedDate}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default CalendarPage;
