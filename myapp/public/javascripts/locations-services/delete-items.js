document.addEventListener('DOMContentLoaded', () => {
  /**
   * Generic function to handle deleting an item
   * @param {string} listId - ID of the UL element
   * @param {string} apiPath - API endpoint path
   */
  const setupDelete = (listId, apiPath) => {
    const list = document.getElementById(listId);

    list.addEventListener('click', async (e) => {
      if (!e.target.classList.contains('delete-btn')) return;

      const id = e.target.dataset.id;
      if (!id) return;

      if (!confirm('Are you sure you want to delete this item?')) return;

      try {
        const res = await fetch(`${apiPath}/${id}`, { method: 'DELETE' });
        if (res.ok) {
          e.target.parentElement.remove(); // remove LI from DOM
        } else {
          const data = await res.json();
          alert(data.error || 'Failed to delete item');
        }
      } catch (err) {
        console.error('Error deleting item:', err);
        alert('Error deleting item');
      }
    });
  };

  // Services delete
  setupDelete('service-list', '/services/api');

  // Locations delete
  setupDelete('location-list', '/locations/api');
});
