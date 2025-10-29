"use strict";

document.addEventListener('DOMContentLoaded', () => {

  // Toggle time inputs on page load and on checkbox change
  document.querySelectorAll('.day-checkbox').forEach(checkbox => {
    const dayRow = checkbox.closest('.day-row');
    const timeInputs = dayRow.querySelector('.time-inputs');
    const unavailableText = dayRow.querySelector('.unavailable-text');

    function updateVisibility() {
      if (checkbox.checked) {
        timeInputs.style.display = 'flex';
        unavailableText.style.display = 'none';
      } else {
        timeInputs.style.display = 'none';
        unavailableText.style.display = 'block';
        // Clear all inputs for this day
        timeInputs.querySelectorAll('input').forEach(input => input.value = '');
      }
    }

    updateVisibility(); // initial state
    checkbox.addEventListener('change', updateVisibility);
  });

  // Add new start/end row
  document.querySelectorAll('.addTime').forEach(btn => {
    btn.addEventListener('click', e => {
      const row = e.target.closest('.day-row');
      const checkbox = row.querySelector('.day-checkbox');
      if (!checkbox.checked) return; // only add if checked

      const inputsDiv = row.querySelector('.time-inputs');
      const newInputs = document.createElement('div');
      newInputs.innerHTML = `
        <input type="time" name="start_${row.dataset.day}[]" placeholder="Start">
        <input type="time" name="end_${row.dataset.day}[]" placeholder="End">
      `;
      inputsDiv.appendChild(newInputs);
    });
  });

  // Remove last start/end row
  document.querySelectorAll('.removeTime').forEach(btn => {
    btn.addEventListener('click', e => {
      const row = e.target.closest('.day-row');
      const inputsDiv = row.querySelector('.time-inputs');
      if (inputsDiv.children.length > 1) {
        inputsDiv.removeChild(inputsDiv.lastChild);
      }
    });
  });

  // Copy times to other checked days
  document.querySelectorAll('.copyTime').forEach(btn => {
    btn.addEventListener('click', e => {
      const row = e.target.closest('.day-row');
      const day = row.dataset.day;
      const checkbox = row.querySelector('.day-checkbox');
      if (!checkbox.checked) return; // only copy if source day is checked

      const startTimes = Array.from(row.querySelectorAll(`input[name="start_${day}[]"]`)).map(i => i.value);
      const endTimes = Array.from(row.querySelectorAll(`input[name="end_${day}[]"]`)).map(i => i.value);

      document.querySelectorAll('.day-row').forEach(targetRow => {
        const targetCheckbox = targetRow.querySelector('.day-checkbox');
        if (targetRow.dataset.day !== day && targetCheckbox.checked) {
          const inputsDiv = targetRow.querySelector('.time-inputs');
          inputsDiv.innerHTML = ''; // clear existing
          startTimes.forEach((start, i) => {
            const end = endTimes[i];
            const div = document.createElement('div');
            div.innerHTML = `<input type="time" name="start_${targetRow.dataset.day}[]" value="${start}">
                             <input type="time" name="end_${targetRow.dataset.day}[]" value="${end}">`;
            inputsDiv.appendChild(div);
          });
        }
      });
    });
  });

});
