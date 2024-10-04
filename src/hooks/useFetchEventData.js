import { useState } from "react";

export default function useFetchEventData() {
  const [eventMarkers, setEventMarkers] = useState([]);
  const [error, setError] = useState(null);

  const fetchEventData = async (name) => {
    try {
      const res = await fetch(`/api/FetchEventData?name=${name}`, {
        headers: {
          accept: "application/json",
        },
      });
      const result = await res.json();

      if (res.ok) {
        const markers = result.map((event) => {
          const eventX = event.EVENT_X;
          const eventY = event.EVENT_Y;
          const eventName = event.EVENT_NM;
          const thumbnail = event.THUMBNAIL;
          const place = event.EVENT_PLACE;
          const period = event.EVENT_PERIOD;
          const url = event.URL;

          return {
            lat: eventY,
            lng: eventX,
            eventName,
            thumbnail,
            place,
            period,
            url,
            key: `${eventY},${eventX}`,
          };
        });
        setEventMarkers(markers);
        return markers;
      } else {
        setEventMarkers([]);
        return [];
      }
    } catch (err) {
      console.error("오류 발생:", err);
      setError(err);
      return [];
    }
  };

  return { eventMarkers, fetchEventData, error };
}
