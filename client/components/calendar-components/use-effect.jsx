import { useEffect } from 'react';

const EffectUse = ({ selectedDate, setTimeSlots, setSelectedSlotId, setLoading }) => {
  useEffect(() => {
    const fetchTimeSlots = async () => {
      setLoading(true);
      const formattedDate = selectedDate.toISOString().split('T')[0];

      try {
        const res = await fetch(`http://localhost:3001/api/time-slots?date=${formattedDate}`);
        const data = await res.json();
        setTimeSlots(data);
        setSelectedSlotId(null);
      } catch (err) {
        console.error('Error fetching time slots:', err);
        setTimeSlots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeSlots();
  }, [selectedDate, setTimeSlots, setSelectedSlotId, setLoading]);

  return null; // no JSX output
};

export default EffectUse;
