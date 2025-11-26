import { useState, useEffect } from "react";

export const useServicesAndLocations = () => {
  const [services, setServices] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, locationsRes] = await Promise.all([
          fetch("http://localhost:3001/services/api"),
          fetch("http://localhost:3001/locations/api"),
        ]);

        const servicesData = await servicesRes.json();
        const locationsData = await locationsRes.json();

        setServices(servicesData);
        setLocations(locationsData);
      } catch (err) {
        console.error("Failed to fetch services or locations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { services, locations, loading };
};
