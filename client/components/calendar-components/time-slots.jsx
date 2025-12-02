import React from "react";

export default function TimeSlots({
  loading,
  timeSlots,
  selectedButtonId,
  handleSelectButton,
  selectedDate,
  bookedTimeSlots = [] // array of booked realDateTime strings or time_slot_ids for that day
}) {

  const generateTimeButtons = (slot) => {
    const buttons = [];
    const intervalMinutes = 60;

    // Loop through hours in the slot
    const [startHour, startMinute] = slot.slot_time.split(":").map(Number);
    const [endHour, endMinute] = slot.end_time.split(":").map(Number);

    let currentTime = new Date(selectedDate);
    currentTime.setHours(startHour, startMinute, 0, 0);

    const endTime = new Date(selectedDate);
    endTime.setHours(endHour, endMinute, 0, 0);

    while (currentTime < endTime) {
      const realDateTimeISO = currentTime.toISOString();

      // Skip if this slot is booked
      if (!bookedTimeSlots.includes(slot.id) && !bookedTimeSlots.includes(realDateTimeISO)) {
        buttons.push({
          buttonId: `${slot.id}-${realDateTimeISO}`,
          time: currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          slotId: slot.id,
          realDateTime: realDateTimeISO
        });
      }

      // increment by interval
      currentTime = new Date(currentTime.getTime() + intervalMinutes * 60000);
    }
console.log('select button IDs', selectedButtonId);
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
                key={timeButton.buttonId}
                onClick={() => handleSelectButton(timeButton)}
                className={`time-slot-btn ${
                  selectedButtonId === timeButton.buttonId ? "selected" : ""
                }`}
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
