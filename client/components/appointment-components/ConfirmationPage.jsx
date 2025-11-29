// FILE: client/pages/confirmation/ConfirmationPage.jsx

import { useEffect, useState } from "react";

export const ConfirmationPage = () => {
  const [appointmentData, setAppointmentData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceId: "",
    locationId: "",
    appointmentType: "",
    slotId: "",
    date: "",
    customAddress: "",
  });

  // ⭐ READ URL PARAMETERS
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const data = {
      name: params.get("name") || "",
      email: params.get("email") || "",
      phone: params.get("phone") || "",
      serviceId: params.get("serviceId") || "",
      locationId: params.get("locationId") || "",
      appointmentType: params.get("appointmentType") || "",
      slotId: params.get("slotId") || "",
      date: params.get("date") || "",
      customAddress: params.get("customAddress") || "",
    };

    setAppointmentData(data);
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "sans-serif" }}>
      <h1>✅ Appointment Confirmed!</h1>
      <p>Thank you, {appointmentData.name}. Here are your appointment details:</p>

      <div style={{ border: "1px solid #ccc", padding: 20, borderRadius: 8, marginTop: 20 }}>
        <p><strong>Date & Time:</strong> {appointmentData.date}</p>
        <p><strong>Service ID:</strong> {appointmentData.serviceId}</p>
        <p><strong>Appointment Type:</strong> {appointmentData.appointmentType}</p>

        {appointmentData.appointmentType === "in-shop" && (
          <p><strong>Location ID:</strong> {appointmentData.locationId}</p>
        )}

        {appointmentData.appointmentType === "mobile" && (
          <p><strong>Mobile Address:</strong> {appointmentData.customAddress}</p>
        )}

        <p><strong>Email:</strong> {appointmentData.email}</p>
        <p><strong>Phone:</strong> {appointmentData.phone}</p>
      </div>
    </div>
  );
};
