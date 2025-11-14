"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#availabilityForm");
  const popup = document.querySelector(".popup-message");

  if (!form || !popup) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent normal form submission

    const formData = new FormData(form);
    const body = new URLSearchParams(formData);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body,
      });

      if (response.ok) {
        console.log("Form saved successfully");

        // Show popup
        popup.classList.remove("hidden");

        // Hide popup after 5 seconds
        setTimeout(() => {
          popup.classList.add("hidden");
        }, 5000);
      } else {
        const text = await response.text();
        console.error("Error saving form:", text);
        alert("Error saving availability: " + text);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Network error while saving availability.");
    }
  });
});
