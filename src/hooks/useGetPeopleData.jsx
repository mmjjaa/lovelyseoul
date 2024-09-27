import { useEffect, useState } from "react";

export default function UseGetPeopleData() {
  const [placesData, setPlacesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_APP_SEOUL_KEY;

  const places = [];
  for (let i = 1; i <= 116; i++) {
    places.push(`POI${String(i).padStart(3, "0")}`);
  }

  //  서울시 실시간 인구데이터
  const fetchPopulationData = async (place) => {
    const res = await fetch(
      `http://openapi.seoul.go.kr:8088/${API_KEY}/json/citydata_ppltn/1/5/${place}`
    );
    if (!res.ok) {
      throw new Error("error");
    }
    const data = await res.json();
    console.log(data);
    console.log(data["SeoulRtd.citydata_ppltn"]);

    return data["SeoulRtd.citydata_ppltn"];
  };

  useEffect(() => {
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
