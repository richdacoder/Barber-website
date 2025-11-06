"use strict";

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#availabilityForm');
  const popup = document.querySelector('.popup-message');

  if (!form || !popup) return; // safe exit if elements don't exist

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent form from actually submitting (for client-side behavior)
    console.log('Form saved successfully');

    // Show popup immediately
    popup.classList.remove('hidden');

    // Hide popup after 5 seconds
    setTimeout(() => {
      popup.classList.add('hidden');
    }, 5000);
  });
});
