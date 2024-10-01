import { useState } from "react";

export default function useFetchEventData() {
  const [eventMarkers, setEventMarkers] = useState([]);
  const [error, setError] = useState(null);
  const API_KEY = import.meta.env.VITE_APP_SEOUL_KEY;

  const fetchEventData = async (name) => {
    try {
      const res = await fetch(
        `http://openapi.seoul.go.kr:8088/${API_KEY}/json/citydata/1/5/${name}`
      );
      const result = await res.json();
      const eventData = result.CITYDATA.EVENT_STTS;

      if (eventData && eventData.length > 0) {
        const markers = eventData.map((event) => {
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
      console.error(" 오류 발생:", err);
      setError(err);
      return [];
    }
  };

  return { eventMarkers, fetchEventData, error };
}
