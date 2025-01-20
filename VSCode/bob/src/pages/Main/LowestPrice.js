import React, { useState, useEffect } from "react";
import { fetchLowestPriceStations } from "../../service/apiService";

const LowestPrice = () => {
  const [oilStations, setOilStations] = useState([]);

  // 지역코드와 지역명을 매핑
  const regionMap = {
    "01": "서울",
    "02": "경기",
    "03": "강원",
    "04": "충북",
    "05": "충남",
    "06": "전북",
    "07": "전남",
    "08": "경북",
    "09": "경남",
    "10": "부산",
    "11": "제주",
    "14": "대구",
    "15": "인천",
    "16": "광주",
    "17": "대전",
    "18": "울산",
    "19": "세종"
  };

  // 데이터를 지역별로 그룹화하여 최저가를 추출
  const groupByRegionAndExtractLowest = (stations) => {
    const grouped = stations.reduce((acc, station) => {
      const regionCode = station.lsSidoCd; // sidocd 값
      if (!acc[regionCode] || acc[regionCode].lsPrice > station.lsPrice) {
        acc[regionCode] = station; // 해당 지역의 최저가 주유소 업데이트
      }
      return acc;
    }, {});

    return Object.values(grouped).map((station) => ({
      ...station,
      regionName: regionMap[station.lsSidoCd] || "알 수 없는 지역" // 지역 이름 추가
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchLowestPriceStations(); // 전체 데이터를 가져옴
        const lowestPriceStations = groupByRegionAndExtractLowest(response); // 지역별 최저가 추출
        setOilStations(lowestPriceStations);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, []);

  // 데이터를 좌우 두 열로 배치
  const pairedStations = [];
  for (let i = 0; i < oilStations.length; i += 2) {
    pairedStations.push(oilStations.slice(i, i + 2));
  }

  return (
    <div className="lowest-price-container">
      <div className="container">
      <h2 className="title">시도별 최저가 주유소</h2>
      <table>
        <thead>
          <tr>
            <th>지역</th>
            <th>주유소 이름</th>
            <th>가격</th>
            <th>지역</th>
            <th>주유소 이름</th>
            <th>가격</th>
          </tr>
        </thead>
        <tbody>
          {pairedStations.map((pair, index) => (
            <tr key={index}>
              {/* 왼쪽 열 */}
              <td>{pair[0]?.regionName || ""}</td>
              <td>{pair[0]?.lsName || ""}</td>
              <td>{pair[0]?.lsPrice || ""}</td>
              {/* 오른쪽 열 */}
              <td>{pair[1]?.regionName || ""}</td>
              <td>{pair[1]?.lsName || ""}</td>
              <td>{pair[1]?.lsPrice || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default LowestPrice;
