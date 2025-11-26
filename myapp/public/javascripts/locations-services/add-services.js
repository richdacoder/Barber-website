document.getElementById('add-service-btn').addEventListener('click', async () => {
  const input = document.getElementById('new-service-name');
  const name = input.value.trim();
  if (!name) return alert("Service name required");

  try {
    const res = await fetch('/services/api', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });

    const newService = await res.json();

    // Append to list instantly
    const container = document.getElementById('service-list');
    container.innerHTML += `
      <li>
        ${newService.name}
        <span class="delete-btn" data-type="service" data-id="${newService.id}">✕</span>
      </li>
    `;

    input.value = "";

  } catch (err) {
    console.error("Failed to add service:", err);
  }
});
