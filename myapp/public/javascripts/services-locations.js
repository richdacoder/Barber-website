async function loadData() {
  try {
    const [servicesRes, locationsRes] = await Promise.all([
      fetch('/services/api'),
      fetch('/locations/api')
    ]);

    const services = await servicesRes.json();
    const locations = await locationsRes.json();
console.log('before service container', services)
// console.log('before locaions container', locations)

    // Services
    const servicesContainer = document.getElementById('service-list');
    servicesContainer.innerHTML = services.map(s => `
      <li>
        ${s.name}
        <span class="delete-btn" data-type="service" data-id="${s.id}">✕</span>
      </li>
    `).join('');

    // Locations
    const locationsContainer = document.getElementById('location-list');
    locationsContainer.innerHTML = locations.map(l =>
      console.log('location list', l)
      `
      <li>
        ${l.address}
        <span class="delete-btn" data-type="location" data-id="${l.id}">✕</span>
      </li>
    `).join('');

  } catch (err) {
    console.error("Failed to load services or locations:", err);
  }
}

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.dataset.id;
    const type = e.target.dataset.type;

    const url = type === 'service' ? `/services/api/${id}` : `/locations/api/${id}`;
    if (confirm('Are you sure you want to delete this?')) {
      const response = await fetch(url, { method: 'DELETE' });
      if (response.ok) e.target.parentElement.remove();
      else console.error(await response.text());
    }
  }
});

window.addEventListener('DOMContentLoaded', loadData);
