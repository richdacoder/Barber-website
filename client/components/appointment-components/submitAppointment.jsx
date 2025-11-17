import axios from "axios";

export const submitAppointment = async ({
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
}) => {
  if (!selectedSlotId) throw new Error("Please select a time slot.");
  if (!service) throw new Error("Please select a service.");

  let finalClientId = clientId;

  if (!clientExists) {
    if (!firstName || !lastName || !email || !phone) {
      throw new Error("Please fill all client fields to create a new client.");
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

  await axios.post("http://localhost:3001/appointments/create", {
    client_id: finalClientId,
    time_slot_id: selectedSlotId,
    service,
    date: selectedDate.toISOString().split("T")[0],
  });

  onSubmit?.();
};
