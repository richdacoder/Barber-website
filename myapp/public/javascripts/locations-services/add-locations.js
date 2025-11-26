document.getElementById('add-location-btn').addEventListener('click', async () => {
  const input = document.getElementById('new-location-name');
  const location_name = input.value.trim();
  if (!location_name) return alert("Location name required");

  try {
    const res = await fetch('/locations/api', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: location_name })
    });

    const newLocation = await res.json();

    const container = document.getElementById('location-list');
    container.innerHTML += `
      <li>
        ${newLocation.address}
        <span class="delete-btn" data-type="location" data-id="${newLocation.id}">✕</span>
      </li>
    `;

    input.value = "";

  } catch (err) {
    console.error("Failed to add location:", err);
  }
});
