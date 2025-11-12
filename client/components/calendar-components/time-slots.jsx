// src/components/calendar-components/time-slots.jsx
import React from "react";

export default function TimeSlots({ loading, timeSlots, selectedSlotId, handleSelectSlot }) {
  return (
    <div className="time-slot-section">
      <h3>Available Time Slots</h3>

      {loading ? (
        <p>Loading slots...</p>
      ) : !Array.isArray(timeSlots) || timeSlots.length === 0 ? (
        <p>No available slots for this date.</p>
      ) : (
        <div className="time-slot-list">
          {timeSlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => handleSelectSlot(slot)}
              className={`time-slot-btn ${selectedSlotId === slot.id ? "selected" : ""}`}
            >
              {slot.slot_time} - {slot.end_time}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
