import { useEffect, useState } from "react";

export default function UseGetData() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 서울시 실시간 도시데이터 전체 카테고리
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://data.seoul.go.kr/SeoulRtd/getCategoryList?page=1&category=%EC%A0%84%EC%B2%B4%EB%B3%B4%EA%B8%B0&count=all&sort=true"
        );
        const result = await res.json();
        console.log(result.row);

        const extractedData = result.row.map((item) => ({
          name: item.area_nm,
          latitude: parseFloat(item.x),
          longitude: parseFloat(item.y),
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
