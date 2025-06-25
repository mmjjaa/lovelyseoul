export default async function handler(req, res) {
  const { name } = req.query;
  const apiKey = process.env.VITE_APP_SEOUL_KEY;

  const url = `http://openapi.seoul.go.kr:8088/${apiKey}/json/citydata/1/5/${name}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const eventData = data?.CITYDATA?.EVENT_STTS;

    const markers =
      eventData?.map((event) => ({
        lat: event.EVENT_Y,
        lng: event.EVENT_X,
        eventName: event.EVENT_NM,
        thumbnail: event.THUMBNAIL,
        place: event.EVENT_PLACE,
        period: event.EVENT_PERIOD,
        url: event.URL,
        key: `${event.EVENT_Y},${event.EVENT_X}`,
      })) || [];

    res.status(200).json(markers);
  } catch (err) {
    console.error("API 호출 실패:", err);
    res.status(500).json({ error: "서울시 API 호출 실패" });
  }
}
