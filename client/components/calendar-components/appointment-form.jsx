import { useState } from 'react';

const AppointmentForm = ({ selectedSlotId, selectedDate, onSubmit }) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [service, setService] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSlotId) {
      alert('Please select a time slot first.');
      return;
    }
    if (!clientName || !clientPhone || !service) {
      alert('Please fill out all fields.');
      return;
    }

    onSubmit({
      date: selectedDate.toDateString(),
      timeSlotId: selectedSlotId,
      clientName,
      clientPhone,
      service
    });

    // reset form
    setClientName('');
    setClientPhone('');
    setService('');
  };

  return (
    <div className="appointment-form">
      <h3>Fill Appointment Details</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Your Name"
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            placeholder="Phone Number"
          />
        </div>
        <div>
          <label>Service:</label>
          <input
            type="text"
            value={service}
            onChange={(e) => setService(e.target.value)}
            placeholder="Service (e.g., Haircut)"
          />
        </div>
        <button type="submit" className="submit-btn">
          Confirm Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
