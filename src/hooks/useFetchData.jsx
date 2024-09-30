import { useEffect, useState } from "react";

export default function UseFetchData() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://data.seoul.go.kr/SeoulRtd/getCategoryList?page=1&category=%EC%A0%84%EC%B2%B4%EB%B3%B4%EA%B8%B0&count=all&sort=true"
        );
        const result = await res.json();
        const extractedData = result.row.map((item) => ({
          name: item.area_nm,
          latitude: parseFloat(item.x),
          longitude: parseFloat(item.y),
          congest: item.area_congest_lvl,
        }));

        setData(extractedData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading };
}
