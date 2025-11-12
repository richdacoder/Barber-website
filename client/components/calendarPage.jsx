import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/CalendarPage.css';

import EffectUse from './calendar-components/use-effect';
import TimeSlots from './calendar-components/time-slots';
import AppointmentForm from './calendar-components/appointment-form';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState(null);

  // Handle slot selection
  const handleSelectSlot = (slot) => {
    setSelectedSlotId(slot.id);
  };

  // Handle form submission
  const handleFormSubmit = (formData) => {
    console.log('Appointment Data:', formData);
    alert('Appointment form filled! (No backend POST yet)');
    setSelectedSlotId(null);
  };

  const today = new Date();

  return (
    <div className="calendar-container">
      <h2>Select a Date</h2>

      {/* Calendar Picker */}
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        inline
        minDate={today}
        calendarStartDay={0}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />

      <p className="selected-date">Selected date: {selectedDate.toDateString()}</p>

      {/* Fetch time slots whenever date changes */}
      <EffectUse
        selectedDate={selectedDate}
        setTimeSlots={setTimeSlots}
        setSelectedSlotId={setSelectedSlotId}
        setLoading={setLoading}
      />

      {/* Time Slots Section */}
      <TimeSlots
        loading={loading}
        timeSlots={timeSlots}
        selectedSlotId={selectedSlotId}
        handleSelectSlot={handleSelectSlot}
      />

      {/* Appointment Form */}
      <AppointmentForm
        selectedSlotId={selectedSlotId}
        selectedDate={selectedDate}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default CalendarPage;
