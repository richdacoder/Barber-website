import { useState } from "react";
import { useLiveClientLookup } from "../appointment-components/useLiveClientLookup";
import { submitAppointment } from "../appointment-components/submitAppointment";
import { ClientInfo } from "../appointment-components/ClientInfo";
import { AppointmentDetails } from "../appointment-components/AppointmentDetails";
import { useServicesAndLocations } from "../appointment-components/useServicesAndLocations";

const AppointmentForm = ({ selectedSlotId, selectedDate, onSubmit }) => {
  // Client state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  // Appointment state
  const [serviceId, setServiceId] = useState("");
  const [locationId, setLocationId] = useState(null);
  const [customAddress, setCustomAddress] = useState("");
  const [customDescription, setCustomDescription] = useState("");
  const [appointmentType, setAppointmentType] = useState("in-shop");

  // Client lookup
  const { clientExists, clientId, checkingClient } = useLiveClientLookup({ firstName, lastName, email, phone });

  // Services & Locations from custom hook
  const { services, locations, loading } = useServicesAndLocations();

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
        serviceId,
        locationId,
        customAddress,
        customDescription,
        appointmentType,
        onSubmit,
      });

      alert("✅ Appointment booked successfully!");

      // Reset form
      setFirstName(""); setLastName(""); setEmail(""); setPhone("");
      setProfilePicture(""); setServiceId(""); setLocationId(null);
      setCustomAddress(""); setCustomDescription(""); setAppointmentType("in-shop");

    } catch (err) {
      alert(err.message || "Failed to create appointment.");
    }
  };

  if (loading) return <p>Loading services and locations...</p>;

  return (
    <div className="appointment-form">
      <h3>Book Appointment</h3>
      <form onSubmit={handleSubmit}>
        <ClientInfo
          firstName={firstName} setFirstName={setFirstName}
          lastName={lastName} setLastName={setLastName}
          email={email} setEmail={setEmail}
          phone={phone} setPhone={setPhone}
          profilePicture={profilePicture} setProfilePicture={setProfilePicture}
        />

        <AppointmentDetails
          serviceId={serviceId} setServiceId={setServiceId} services={services}
          locationId={locationId} setLocationId={setLocationId} locations={locations}
          customAddress={customAddress} setCustomAddress={setCustomAddress}
          customDescription={customDescription} setCustomDescription={setCustomDescription}
          appointmentType={appointmentType} setAppointmentType={setAppointmentType}
        />

        <button type="submit" className="submit-btn" disabled={checkingClient}>
          {checkingClient ? "Checking client..." : "Confirm Appointment"}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
