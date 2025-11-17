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
  const [selectedSlotId, setSelectedSlotId] = useState(null);

  console.log("Selected Slot ID:", selectedSlotId);

  // Fetch slots when date changes
  useFetchSlots({ selectedDate, setLoading, setTimeSlots, setSelectedSlotId });

  // Handle slot selection — always pass the numeric slotId
  const handleSelectSlot = (timeButton) => {
    console.log("Selected Slot:", timeButton);
    setSelectedSlotId(timeButton.slotId); // integer
  };

  // Handle form submission
  const handleFormSubmit = (formData) => {
    console.log('Appointment Data:', formData);
    setSelectedSlotId(null);
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
        selectedSlotId={selectedSlotId}
        handleSelectSlot={handleSelectSlot}
      />

      <AppointmentForm
        selectedSlotId={selectedSlotId}
        selectedDate={selectedDate}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default CalendarPage;
