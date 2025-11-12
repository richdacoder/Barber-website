// src/components/calendar-components/use-effect.jsx
import { useEffect } from "react";
import axios from "axios";

export default function useFetchSlots({ selectedDate, setLoading, setTimeSlots, setSelectedSlotId }) {
  useEffect(() => {
    if (!selectedDate) return;

    const fetchSlots = async () => {
      setLoading(true);
      const formattedDate = selectedDate.toISOString().split("T")[0];

      try {
        const res = await axios.get("http://localhost:3001/calendar", {
          params: { date: formattedDate },
        });
        console.log(res.data);


        // ✅ Ensure it's always an array
        setTimeSlots(Array.isArray(res.data) ? res.data : []);
        setSelectedSlotId(null);
      } catch (err) {
        console.error("Error fetching time slots:", err);
        setTimeSlots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [selectedDate]);
}
