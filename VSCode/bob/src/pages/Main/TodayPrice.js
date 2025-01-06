import React, { useState, useEffect } from "react";

const TodayPrice = () => {
  const [prices, setPrices] = useState({
    national: null,
    regional: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPriceData = async () => {
      const apiKey = "F241220549"; // API 키
      const nationalUrl = `https://www.opinet.co.kr/api/avgAllPrice.do?code=${apiKey}&out=json`; // 전국 평균
      const regionalUrl = `https://www.opinet.co.kr/api/avgSidoPrice.do?code=${apiKey}&sido=16&out=json`; // 충남 평균 (16: 충남 코드)

      try {
        // 전국 평균 데이터 가져오기
        const nationalResponse = await fetch(nationalUrl);
        const nationalData = await nationalResponse.json();

        // 충남 평균 데이터 가져오기
        const regionalResponse = await fetch(regionalUrl);
        const regionalData = await regionalResponse.json();

        // 데이터 설정
        setPrices({
          national: {
            avgPrice: nationalData.RESULT.OIL[0].PRICE,
            minPrice: nationalData.RESULT.OIL[0].LOWEST,
            maxPrice: nationalData.RESULT.OIL[0].HIGHEST,
            change: nationalData.RESULT.OIL[0].DIFF,
          },
          regional: {
            avgPrice: regionalData.RESULT.OIL[0].PRICE,
            minPrice: regionalData.RESULT.OIL[0].LOWEST,
            maxPrice: regionalData.RESULT.OIL[0].HIGHEST,
            change: regionalData.RESULT.OIL[0].DIFF,
          },
        });
      } catch (err) {
        setError("데이터를 가져오는 중 문제가 발생했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPriceData();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="price-container">
      <div className="price-box1">
        <div className="box-title">오늘의 유가</div>
        {/* 전국 평균 */}
        <div className="price-box">
          <h3>전국 평균</h3>
          <p className="price">
            <span className="value">{prices.national.avgPrice}</span>{" "}
            <span className="change">{prices.national.change > 0 ? `▲${prices.national.change}` : `▼${prices.national.change}`}</span>
            <p className="details">
              최저가: {prices.national.minPrice} | 최고가: {prices.national.maxPrice}
            </p>
          </p>
        </div>
        {/* 충남 평균 */}
        <div className="price-box">
          <h3>충남 평균</h3>
          <p className="price">
            <span className="value">{prices.regional.avgPrice}</span>{" "}
            <span className="change">{prices.regional.change > 0 ? `▲${prices.regional.change}` : `▼${prices.regional.change}`}</span>
            <p className="details">
              최저가: {prices.regional.minPrice} | 최고가: {prices.regional.maxPrice}
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodayPrice;
