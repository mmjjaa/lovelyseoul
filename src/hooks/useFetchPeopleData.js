import { useEffect, useState } from "react";

export default function UseFetchPeopleData() {
  const [placesData, setPlacesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const places = [];
  for (let i = 1; i <= 116; i++) {
    places.push(`POI${String(i).padStart(3, "0")}`);
  }

  useEffect(() => {
    const fetchPopulationData = async (place) => {
      const res = await fetch(`/api/FetchPeopleData?place=${place}`, {
        headers: {
          accept: "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("error");
      }
      const data = await res.json();
      return data;
    };

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const allPlacesData = await Promise.all(
          places.map(fetchPopulationData)
        );
        setPlacesData(allPlacesData);
      } catch (error) {
        console.error("error", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { placesData, isLoading };
}
