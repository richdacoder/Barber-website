"use strict";
console.log('copy hours')
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('copyPopup');
  const daysList = document.getElementById('copyDays');
  const applyBtn = document.getElementById('applyCopy');
  const closeBtn = document.getElementById('closeCopy');
  let sourceDay = null;

  const allDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Helper: build a time pair input HTML string
  const buildTimePair = (day, start, end) => `
    <div class="time-pair">
      <input type="hidden" name="id_${day}[]" value="">
      <input type="time" name="start_${day}[]" value="${start}">
      <input type="time" name="end_${day}[]" value="${end}">
    </div>
  `;

  // Open popup when copy button is clicked
  document.querySelectorAll('.copyTime').forEach(btn => {
    btn.addEventListener('click', e => {
      const row = e.target.closest('.day-row');
      if (!row) return;

      sourceDay = row.dataset.day;
      const checkbox = row.querySelector('.day-checkbox');
      if (!checkbox.checked) {
        return; // prevent copying from unavailable day
      }

      const startTimes = Array.from(row.querySelectorAll(`input[name="start_${sourceDay}[]"]`)).map(i => i.value);
      const endTimes = Array.from(row.querySelectorAll(`input[name="end_${sourceDay}[]"]`)).map(i => i.value);

      // Build checkbox list
      daysList.innerHTML = '';
      allDays.forEach(day => {
        const div = document.createElement('div');
        div.classList.add('copy-day-row');
        div.innerHTML = `
          <label>
            <span>${day}</span>
            <input type="checkbox" class="copy-day-checkbox" value="${day}" ${day === sourceDay ? 'checked disabled' : ''}>
          </label>
        `;
        daysList.appendChild(div);
      });

      popup.dataset.startTimes = JSON.stringify(startTimes);
      popup.dataset.endTimes = JSON.stringify(endTimes);
      popup.classList.remove('hidden');
      popup.classList.add('show');
    });
  });

  // Apply copied times
  applyBtn.addEventListener('click', () => {
    const startTimes = JSON.parse(popup.dataset.startTimes || '[]');
    const endTimes = JSON.parse(popup.dataset.endTimes || '[]');
    const checkedDays = Array.from(daysList.querySelectorAll('.copy-day-checkbox:checked'))
                             .map(cb => cb.value);

    checkedDays.forEach(day => {
      if (day === sourceDay) return;

      const row = document.querySelector(`.day-row[data-day="${day}"]`);
      if (!row) return;

      const inputsDiv = row.querySelector('.time-inputs');
      const unavailableText = row.querySelector('.unavailable-text');
      const checkbox = row.querySelector('.day-checkbox');

      checkbox.checked = true;
      inputsDiv.innerHTML = startTimes.map((start, i) => buildTimePair(day, start, endTimes[i])).join('');
      inputsDiv.style.display = 'flex';
      unavailableText.style.display = 'none';
    });

    popup.classList.add('hidden');
    popup.classList.remove('show');
  });

  // Close popup
  closeBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
    popup.classList.remove('show');
  });
});
