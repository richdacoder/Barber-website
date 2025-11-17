import { useState, useEffect } from "react";
import axios from "axios";

export const useLiveClientLookup = ({ firstName, lastName, email, phone }) => {
  const [clientExists, setClientExists] = useState(false);
  const [clientId, setClientId] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");
  const [checkingClient, setCheckingClient] = useState(false);

  useEffect(() => {
    const fetchClient = async () => {
      const hasName = firstName && lastName;
      const hasContact = email || phone;

      if (!hasName && !hasContact) {
        setClientExists(false);
        setClientId(null);
        setProfilePicture("");
        return;
      }

      setCheckingClient(true);
      try {
        const res = await axios.post("http://localhost:3001/clients", {
          action: "check",
          first_name: firstName,
          last_name: lastName,
          email,
          phone_number: phone,
        });

        if (res.data.exists) {
          setClientExists(true);
          setClientId(res.data.id);
          setProfilePicture(res.data.profile_picture || "");
        } else {
          setClientExists(false);
          setClientId(null);
          setProfilePicture("");
        }
      } catch (err) {
        console.error("Error checking client:", err);
      } finally {
        setCheckingClient(false);
      }
    };

    const timeout = setTimeout(fetchClient, 500);
    return () => clearTimeout(timeout);
  }, [firstName, lastName, email, phone]);

  return { clientExists, clientId, profilePicture, checkingClient, setProfilePicture };
};
