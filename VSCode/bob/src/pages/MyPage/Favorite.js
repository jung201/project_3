import React, { useState } from "react";
import "../../static/scss/MyPage/Favorite.scss";

const Favorite = () => {
  // 예제 데이터
  const allStations = [
    { name: "만수르 주유소", address: "천안시 서북구 광장로 21" },
    { name: "천안 주유소", address: "천안시 동남구 중앙로 51" },
    { name: "샤우디 주유소", address: "천안시 서북구 서북로 33" },
    { name: "농협클린주유소", address: "천안시 서북구 백석로 20" },
    { name: "쌍용주유소", address: "천안시 서북구 충무로 15" },
    { name: "서울 주유소", address: "서울시 강남구 강남대로 123" },
    { name: "부산 주유소", address: "부산시 해운대구 해운대로 456" },
  ];

  const itemsPerPage = 3; // 한 페이지당 표시할 항목 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  const totalPages = Math.ceil(allStations.length / itemsPerPage);

  // 현재 페이지 데이터 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStations = allStations.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="favorite-gas-station">
      <h3>나의 관심 주유소</h3>
      <table>
        <thead>
          <tr>
            <th>주유소명</th>
            <th>주소</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {currentStations.map((station, index) => (
            <tr key={index}>
              <td>
                <span name={`station-${index}`}>{station.name}</span>
              </td>
              <td name={`station-address-${index}`}>{station.address}</td>
              <td>
                <button 
                style={{backgroundcolor:"#f8f9fa", border:"solid 1px #ccc"}}
                name={`delete-station-${index}`}
                onClick={() => alert("삭제하시겠습니까?")}
                >삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="pagination">
        <button
          name="prevPage"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          name="nextPage"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Favorite;
