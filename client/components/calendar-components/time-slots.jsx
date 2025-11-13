import React from "react";

export default function TimeSlots({ loading, timeSlots, selectedSlotId, handleSelectSlot }) {

  // Helper: Generate individual time buttons between start and end
  const generateTimeButtons = (slot) => {
    const buttons = [];
    const start = new Date(`1970-01-01T${slot.slot_time}`);
    const end = new Date(`1970-01-01T${slot.end_time}`);

    // Set your interval (in minutes) — 60 for hourly, 30 for half-hour
    const intervalMinutes = 60;

    for (let t = new Date(start); t < end; t.setMinutes(t.getMinutes() + intervalMinutes)) {
      const label = t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      buttons.push({
        id: `${slot.id}-${label}`, // unique key
        time: label,
        slotId: slot.id,
      });
    }

    return buttons;
  };

  return (
    <div className="time-slot-section">
      <h3>Available Time Slots</h3>

      {loading ? (
        <p>Loading slots...</p>
      ) : !Array.isArray(timeSlots) || timeSlots.length === 0 ? (
        <p>No available slots for this date.</p>
      ) : (
        <div className="time-slot-list">
          {timeSlots.flatMap((slot) =>
            generateTimeButtons(slot).map((timeButton) => (
              <button
                key={timeButton.id}
                onClick={() => handleSelectSlot(timeButton)}
                className={`time-slot-btn ${selectedSlotId === timeButton.id ? "selected" : ""}`}
              >
                {timeButton.time}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
