import React from "react";
import { getTodayOilAverages } from "../../service/apiService";

const TodayPrice = () => {
  const [oilAverages, setOilAverages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOilAverages = async () => {
      try {
        const data = await getTodayOilAverages();
        setOilAverages(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchOilAverages();
  }, []);

  if (error) return <div>평균 유가 데이터를 불러오는 중 오류가 발생했습니다.</div>;
  if (!oilAverages.length) return <div>평균 유가 데이터를 불러오는 중...</div>;
  return (
    <div className="price-container">
      <div className="left">
        <h2>오늘의 유가</h2>
        {/* 데이터를 반복하면서 전국 평균 및 충남 평균을 출력 */}
        {oilAverages.map((average, index) => (
          <div className="price-box" key={index}>
            <h3>{average.region}</h3>
            <p className="price">
              <span className="value">{average.averagePrice.toFixed(2)}</span>{" "}
              <span className="change">{average.change > 0 ? `▲${average.change}` : `▼${Math.abs(average.change)}`}</span>
            </p>
            <p className="details">
              최저가: {average.minPrice} | 최고가: {average.maxPrice}
            </p>
          </div>
        ))}
      </div>
      <div className="price-img"></div>
    </div>
  );
};

export default TodayPrice;
