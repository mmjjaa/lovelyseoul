/* eslint-disable no-undef */
export default async function handler(req, res) {
  const API_KEY = process.env.VITE_APP_SEOUL_KEY;
  const { name } = req.query;
  const apiUrl = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/citydata/1/5/${name}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    const eventData = result.CITYDATA.EVENT_STTS;

    if (eventData && eventData.length > 0) {
      res.status(200).json(eventData);
    } else {
      res.status(404).json([]);
    }
  } catch (error) {
    console.error("오류 발생:", error);
    res.status(500).json({ error: "Failed to fetch event data" });
  }
}
