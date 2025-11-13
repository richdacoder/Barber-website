import { useState } from "react";
import axios from "axios";

const AppointmentForm = ({ selectedSlotId, selectedDate, onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const [clientExists, setClientExists] = useState(false);
  const [clientId, setClientId] = useState(null);
  const [checkingClient, setCheckingClient] = useState(false);

  // ✅ Check if client exists by name/email/phone
  const checkClient = async () => {
    if (!firstName && !lastName && !email && !phone) {
      alert("Please enter at least one piece of client info.");
      return;
    }

    setCheckingClient(true);

    try {
      const res = await axios.post("http://localhost:3001/api/check-client", {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phone,
      });

      if (res.data.exists) {
        setClientExists(true);
        setClientId(res.data.id);
        alert("✅ Client found! You can now book an appointment.");
      } else {
        setClientExists(false);
        setClientId(null);
        alert("⚠️ No client found. Fill out all fields to create one.");
      }
    } catch (err) {
      console.error("Error checking client:", err);
      alert("Server error while checking client.");
    } finally {
      setCheckingClient(false);
    }
  };

  // ✅ Create appointment (and new client if needed)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSlotId) {
      alert("Please select a time slot first.");
      return;
    }
    if (!service) {
      alert("Please select a service.");
      return;
    }

    try {
      let finalClientId = clientId;

      // Create client first if they don't exist
      if (!clientExists) {
        if (!firstName || !lastName || !email || !phone) {
          alert("Please fill all client fields to create a new client.");
          return;
        }

        const clientRes = await axios.post("http://localhost:3001/api/clients", {
          first_name: firstName,
          last_name: lastName,
          email,
          phone_number: phone,
          profile_picture: profilePicture || null, // optional
        });

        finalClientId = clientRes.data.id;
        setClientId(finalClientId);
        setClientExists(true);
      }

      // ✅ Create the appointment
      const apptRes = await axios.post("http://localhost:3001/api/appointments", {
        client_id: finalClientId,
        time_slot_id: selectedSlotId,
        service,
        date: selectedDate.toISOString().split("T")[0],
      });

      alert("✅ Appointment booked successfully!");
      onSubmit?.(apptRes.data);

      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setService("");
      setProfilePicture("");
      setClientExists(false);
      setClientId(null);
    } catch (err) {
      console.error("Error creating appointment:", err);
      alert("Failed to create appointment.");
    }
  };

  return (
    <div className="appointment-form">
      <h3>Book Appointment</h3>
      <form onSubmit={handleSubmit}>
        {/* Client Info */}
        <div className="form-section">
          <h4>Client Information</h4>

          <div>
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
          </div>

          <div>
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
          </div>

          <div>
            <label>Phone:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
            />
          </div>

          <div>
            <label>Profile Picture (optional):</label>
            <input
              type="text"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
              placeholder="Profile picture URL (optional)"
            />
          </div>

          <button
            type="button"
            onClick={checkClient}
            disabled={checkingClient}
            className="check-btn"
          >
            {checkingClient ? "Checking..." : "Check if Client Exists"}
          </button>
        </div>

        {/* Appointment Info */}
        <div className="form-section">
          <h4>Appointment Details</h4>

          <div>
            <label>Service:</label>
            <input
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="Service (e.g., Haircut)"
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Confirm Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
