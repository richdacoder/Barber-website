"use strict";

document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('copyPopup');
  const applyBtn = document.getElementById('applyCopy');
  const closeBtn = document.getElementById('closeCopy');
  const copyDaysContainer = document.getElementById('copyDays');

  let sourceRow = null; // the day-row where user clicked copy

  // Open popup on 📋 button click
  document.querySelectorAll('.copyTime').forEach(btn => {
    btn.addEventListener('click', e => {
      sourceRow = e.target.closest('.day-row');
      const sourceDay = sourceRow.dataset.day;

      // Clear and populate copyDaysContainer with all days except source
      copyDaysContainer.innerHTML = '';
      document.querySelectorAll('.day-row').forEach(row => {
        const day = row.dataset.day;
        if (day === sourceDay) return; // skip source day

        const div = document.createElement('div');
        div.classList.add('copy-day-row');
        div.innerHTML = `
          <label for="copy_${day}">${day}</label>
          <input type="checkbox" class="copy-day-checkbox" value="${day}">
        `;
        copyDaysContainer.appendChild(div);
      });

      popup.classList.remove('hidden');
    });
  });

  // Close popup
  closeBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
  });

  // Apply copy
  applyBtn.addEventListener('click', () => {
    if (!sourceRow) return;

    const sourceDay = sourceRow.dataset.day;
    const startTimes = Array.from(sourceRow.querySelectorAll(`input[name="start_${sourceDay}[]"]`)).map(i => i.value);
    const endTimes = Array.from(sourceRow.querySelectorAll(`input[name="end_${sourceDay}[]"]`)).map(i => i.value);

    // Copy to selected target days
    document.querySelectorAll('.copy-day-checkbox:checked').forEach(checkbox => {
      const targetDay = checkbox.value;
      const targetRow = document.querySelector(`.day-row[data-day="${targetDay}"]`);
      if (!targetRow) return;

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

      // Make target row visible if it was hidden
      targetRow.querySelector('.time-inputs').style.display = 'flex';
      targetRow.querySelector('.unavailable-text').style.display = 'none';
      targetRow.querySelector('.day-checkbox').checked = true;
    });

    popup.classList.add('hidden');
  });

});
