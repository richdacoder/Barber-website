"use strict";

document.addEventListener('DOMContentLoaded', () => {
  console.log('Availability JS loaded');
  // Helper: toggle time inputs & unavailable text
  const toggleTimeInputs = (row, show) => {
    const timeInputs = row.querySelector('.time-inputs');
    const unavailableText = row.querySelector('.unavailable-text');

    timeInputs.style.display = show ? 'flex' : 'none';
    unavailableText.style.display = show ? 'none' : 'block';

    // Clear inputs if hiding
    if (!show) {
      timeInputs.querySelectorAll('input').forEach(input => input.value = '');
    }
  };

  // Initial setup and checkbox toggle
  document.querySelectorAll('.day-checkbox').forEach(checkbox => {
    const row = checkbox.closest('.day-row');

    // Initialize
    toggleTimeInputs(row, checkbox.checked);

    checkbox.addEventListener('change', () => toggleTimeInputs(row, checkbox.checked));
  });

  // Add new start/end time row
  document.querySelectorAll('.addTime').forEach(btn => {
    btn.addEventListener('click', e => {
      const row = e.target.closest('.day-row');
      console.log(row);
      const checkbox = row.querySelector('.day-checkbox');
      if (!checkbox.checked) return; // only add if checked

      const inputsDiv = row.querySelector('.time-inputs');
      const div = document.createElement('div');
      div.classList.add('time-pair');
      div.innerHTML = `
        <input type="time" name="start_${row.dataset.day}[]" placeholder="Start">
        <input type="time" name="end_${row.dataset.day}[]" placeholder="End">
      `;
      inputsDiv.appendChild(div);
      console.log(inputsDiv)
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
      if (!checkbox.checked) return;

      // Collect source times
      const startTimes = Array.from(row.querySelectorAll(`input[name="start_${day}[]"]`)).map(i => i.value);
      const endTimes = Array.from(row.querySelectorAll(`input[name="end_${day}[]"]`)).map(i => i.value);

      // Apply to all other checked days
      document.querySelectorAll('.day-row').forEach(targetRow => {
        const targetDay = targetRow.dataset.day;
        const targetCheckbox = targetRow.querySelector('.day-checkbox');

        if (targetDay !== day && targetCheckbox.checked) {
          const inputsDiv = targetRow.querySelector('.time-inputs');
          inputsDiv.innerHTML = ''; // clear existing

          startTimes.forEach((start, i) => {
            const end = endTimes[i];
            const div = document.createElement('div');
            div.classList.add('time-pair');
            div.innerHTML = `
              <input type="time" name="start_${targetDay}[]" value="${start}">
              <input type="time" name="end_${targetDay}[]" value="${end}">
            `;
            inputsDiv.appendChild(div);
          });
        }
      });
    });
  });

});
