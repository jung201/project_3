import React from "react";



const LowestPrice = () => {
  // 주유소 데이터
  const oilStations = [
    { region: "서울", name: "종로 주유소", price: 1551 },
    { region: "부산", name: "아미파크 주유소", price: 1532 },
    { region: "대구", name: "대표리카 주유소", price: 1552 },
    { region: "인천", name: "차이나타운 주유소", price: 1553 },
    { region: "광주", name: "빛고을 주유소", price: 1515 },
    { region: "대전", name: "성심당 주유소", price: 1545 },
    { region: "울산", name: "울산바위 주유소", price: 1533 },
    { region: "세종", name: "훈민정음 주유소", price: 1554 },
  ];

  const oilStations2 = [
    { region: "경기", name: "경기 주유소", price: 1414 },
    { region: "강원", name: "강자 주유소", price: 1514 },
    { region: "충북", name: "충청 주유소", price: 1415 },
    { region: "충남", name: "천안 주유소", price: 1567 },
    { region: "전북", name: "전주한옥 주유소", price: 1558 },
    { region: "전남", name: "제철소 주유소", price: 1557 },
    { region: "경남", name: "어너스 주유소", price: 1567 },
    { region: "제주", name: "감귤 주유소", price: 1577 },
  ];

  return (
    <div className="lowest-price-container">
      <div className="container">
        {/* 제목 */}
        <h2 className="title">시도별 최저가 주유소</h2>
        <div className="oil-station-table">
          {/* 왼쪽 테이블 */}
          <table>
            <tbody>
              {oilStations.map((station, index) => (
                <tr key={index}>
                  <td>{station.region}</td>
                  <td>{station.name}</td>
                  <td>{station.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 오른쪽 테이블 */}
          <table>
            <tbody>
              {oilStations2.map((station, index) => (
                <tr key={index}>
                  <td>{station.region}</td>
                  <td>{station.name}</td>
                  <td>{station.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LowestPrice;
