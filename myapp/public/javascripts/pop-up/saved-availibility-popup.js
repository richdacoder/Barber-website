document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('availabilityForm');
  const popup = document.getElementById('popup-message');

  if (form) {
    form.addEventListener('submit', () => {
      // Show popup immediately
      popup.textContent = 'Availability saved!';
      popup.classList.remove('hidden');
      popup.classList.add('show');

      // Hide popup after 2 seconds
      setTimeout(() => {
        popup.classList.remove('show');
        popup.classList.add('hidden');
      }, 2000);
    });
  }
});
