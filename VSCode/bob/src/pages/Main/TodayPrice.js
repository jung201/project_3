import React, { useEffect, useState } from "react";
import { Price_API } from "../../service/apiService";


const TodayPrice = () => {
  const [oilAverages, setOilAverages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodayPrices = async () => {
      try {
        const data = await Price_API.getTodayOilPriceData();
        setOilAverages(data);
      } catch (err) {
        console.error("데이터 로드 실패:", err);
        setError(err);
      }
    };
    fetchTodayPrices();
  }, []);

  if (error) return <div>평균 유가 데이터를 불러오는 중 오류가 발생했습니다.</div>;
  if (!oilAverages.length) return <div>평균 유가 데이터를 불러오는 중...</div>;
  return (
    <div className="price-container">
      <div className="left">
        <h2>오늘의 유가</h2>
        {oilAverages.map((item, index) => (
          <div className="price-box" key={index}>
            <h3>{item.region} 평균</h3>
            <p className="price">
              <span className="value">{item.averagePrice?.toFixed(2)}</span>{" "}
              {/* priceChange 양/음수에 따라 상승/하락 표시 */}
              <span className="change">
                {item.priceChange > 0
                  ? `▲${item.priceChange.toFixed(2)}`
                  : `▼${Math.abs(item.priceChange).toFixed(2)}`
                }
              </span>
              <p className="details">
                최저가: {item.minPrice?.toFixed(2)} | 최고가: {item.maxPrice?.toFixed(2)}
              </p>
            </p>
          </div>
        ))}
      </div>
      <div className="price-img"></div>
    </div>
  );
};
export default TodayPrice;
