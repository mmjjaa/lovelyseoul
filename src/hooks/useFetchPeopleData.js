import { useEffect, useState } from "react";
import pLimit from "p-limit";

export default function UseFetchPeopleData() {
  const [placesData, setPlacesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const places = [];
  for (let i = 1; i <= 116; i++) {
    places.push(`POI${String(i).padStart(3, "0")}`);
  }

  useEffect(() => {
    const fetchPeopleData = async (place) => {
      try {
        const res = await fetch(`/api/fetchPeopleData?place=${place}`);
        if (!res.ok) return null;

        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) return null;

        const json = await res.json();
        return json;
      } catch {
        return null;
      }
    };

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const limit = pLimit(20);
        const limitedFetches = places.map((place) =>
          limit(() => fetchPeopleData(place))
        );
        const results = await Promise.all(limitedFetches);
        const filtered = results.filter(Boolean);
        setPlacesData(filtered);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { placesData, isLoading };
}
