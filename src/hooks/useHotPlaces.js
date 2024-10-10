import { useState, useEffect } from "react";

export default function useHotPlaces(placesData, userAge, isLoading) {
  const [hotPlaces, setHotPlaces] = useState([]);
  /* 인기 많은 곳 가져오기 */
  useEffect(() => {
    if (!isLoading && placesData.length) {
      const top10Places = placesData
        .sort(
          (a, b) =>
            b[0][`PPLTN_RATE_${userAge}`] - a[0][`PPLTN_RATE_${userAge}`]
        )
        .slice(0, 10);

      setHotPlaces(top10Places);
    }
  }, [placesData, isLoading, userAge]);

  return hotPlaces;
}
