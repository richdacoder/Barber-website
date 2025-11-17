import { useState } from "react";
import { useLiveClientLookup } from "../appointment-components/useLiveClientLookup";
import { ProfilePictureInput } from "../appointment-components/ProfilePictureInput";
import { submitAppointment } from "../appointment-components/submitAppointment";

const AppointmentForm = ({ selectedSlotId, selectedDate, onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");

  const { clientExists, clientId, profilePicture, checkingClient, setProfilePicture } =
    useLiveClientLookup({ firstName, lastName, email, phone });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitAppointment({
        firstName,
        lastName,
        email,
        phone,
        profilePicture,
        clientExists,
        clientId,
        selectedSlotId,
        service,
        selectedDate,
        onSubmit,
      });

      alert("✅ Appointment booked successfully!");

      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setService("");
      setProfilePicture("");
    } catch (err) {
      alert(err.message || "Failed to create appointment.");
    }
  };

  return (
    <div className="appointment-form">
      <h3>Book Appointment</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h4>Client Information</h4>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
          />

          <ProfilePictureInput profilePicture={profilePicture} setProfilePicture={setProfilePicture} />
        </div>

        <div className="form-section">
          <h4>Appointment Details</h4>
          <input
            type="text"
            value={service}
            onChange={(e) => setService(e.target.value)}
            placeholder="Service (e.g., Haircut)"
          />
        </div>

        <button type="submit" className="submit-btn" disabled={checkingClient}>
          {checkingClient ? "Checking client..." : "Confirm Appointment"}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
