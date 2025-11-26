import axios from "axios";

export const submitAppointment = async ({
  firstName,
  lastName,
  email,
  phone,
  profilePicture,
  clientExists,
  clientId,
  selectedSlotId,       // maps to time_slot_id
  serviceId,            // maps to service_id
  locationId,           // maps to location_id (optional)
  customAddress,        // maps to custom_address
  customDescription,    // maps to custom_description
  appointmentType,      // "mobile" or "in-shop"
  onSubmit,
}) => {

  // Required fields based on schema
  if (!selectedSlotId) throw new Error("Please select a time slot.");
  if (!serviceId) throw new Error("Please select a service.");

  let finalClientId = clientId;

  // Create client if needed
  if (!clientExists) {
    if (!firstName || !lastName || !email || !phone) {
      throw new Error("Please fill all client fields.");
    }

    const clientRes = await axios.post("http://localhost:3001/clients", {
      action: "create",
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phone,
      profile_picture: profilePicture || null,
    });

    finalClientId = clientRes.data.id;
  }

  // Create appointment
  await axios.post("http://localhost:3001/appointments/create", {
    client_id: finalClientId,
    time_slot_id: selectedSlotId,
    service_id: serviceId,
    location_id: locationId || null,  // can be null
    custom_address: customAddress || null,
    custom_description: customDescription || null,
    appointment_type: appointmentType || "in-shop",  // default
  });

  onSubmit?.();
};
