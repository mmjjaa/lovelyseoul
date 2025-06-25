import { useState } from "react";

export default function useFetchEventData() {
  const [eventMarkers, setEventMarkers] = useState([]);
  const [error, setError] = useState(null);

  const fetchEventData = async (name) => {
    try {
      const res = await fetch(`/api/fetchEventData?name=${name}`);
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || `HTTP ${res.status}`);
      }
      const markers = await res.json();
      setEventMarkers(markers);
      return markers;
    } catch (err) {
      console.error("API 오류:", err);
      setError(err);
      return [];
    }
  };

  return { eventMarkers, fetchEventData, error };
}
