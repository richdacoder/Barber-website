export const AppointmentDetails = ({
  serviceId, setServiceId,
  services = [],
  locationId, setLocationId,
  locations = [],
  appointmentType, setAppointmentType,
  customAddress, setCustomAddress,
  customDescription, setCustomDescription
}) => {
  // Reset location/custom address when appointment type changes
  const handleTypeChange = (e) => {
    const type = e.target.value;
    setAppointmentType(type);
    if (type === "in-shop") {
      setCustomAddress(""); // clear user input for mobile
    } else {
      setLocationId(null); // clear selected in-shop location
    }
  };

  return (
    <div className="form-section">
      <h4>Appointment Details</h4>

      {/* Service Dropdown */}
      <select value={serviceId} onChange={(e) => setServiceId(Number(e.target.value))}>
        <option value="">Select Service</option>
        {services.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>

      {/* Location or Custom Address depending on appointment type */}
      {appointmentType === "in-shop" ? (
        <select value={locationId || ""} onChange={(e) => setLocationId(Number(e.target.value))}>
          <option value="">Select Location</option>
          {locations.map((l) => (
            <option key={l.id} value={l.id}>{l.address}</option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          value={customAddress}
          onChange={(e) => setCustomAddress(e.target.value)}
          placeholder="Enter your address"
        />
      )}

      {/* Notes / Description */}
      <input
        type="text"
        value={customDescription}
        onChange={(e) => setCustomDescription(e.target.value)}
        placeholder="Notes or Description"
      />

      {/* Appointment Type Selector */}
      <select value={appointmentType} onChange={handleTypeChange}>
        <option value="in-shop">In-Shop</option>
        <option value="mobile">Mobile</option>
      </select>
    </div>
  );
};
