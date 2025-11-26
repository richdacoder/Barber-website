async function loadData() {
  try {
    const [servicesRes, locationsRes] = await Promise.all([
      fetch('/services/api'),
      fetch('/locations/api')
    ]);

    const services = await servicesRes.json();
    const locations = await locationsRes.json();

    renderServices(services);
    renderLocations(locations);

  } catch (err) {
    console.error("Failed to load services or locations:", err);
  }
}

function renderServices(services) {
  const container = document.getElementById('service-list');
  container.innerHTML = services.map(s => `
    <li>
      ${s.name}
      <span class="delete-btn" data-type="service" data-id="${s.id}">✕</span>
    </li>
  `).join('');
}

function renderLocations(locations) {
  const container = document.getElementById('location-list');
  container.innerHTML = locations.map(l => `
    <li>
      ${l.location_name}
      <span class="delete-btn" data-type="location" data-id="${l.id}">✕</span>
    </li>
  `).join('');
}
