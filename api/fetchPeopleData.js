export default async function handler(req, res) {
  const { place } = req.query;
  const apiKey = process.env.VITE_APP_SEOUL_KEY;
  const url = `http://openapi.seoul.go.kr:8088/${apiKey}/json/citydata_ppltn/1/5/${place}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data["SeoulRtd.citydata_ppltn"]);
  } catch {
    res.status(500).json({ error: "서울시 API 호출 실패" });
  }
}
