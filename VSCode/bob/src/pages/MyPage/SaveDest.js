import React, { useState } from "react";
import "../../static/scss/MyPage/SaveDest.scss";

const SaveDest = () => {
  // 예제 데이터
  const allDestinations = [
    { date: "2024/11/10", station: "만수르 주유소", destination: "현충사 입구" },
    { date: "2024/11/12", station: "-", destination: "천안역" },
    { date: "2024/11/13", station: "샤우디 주유소", destination: "휴먼교육센터" },
    { date: "2024/11/14", station: "-", destination: "천안아산역" },
    { date: "2024/11/15", station: "쌍용주유소", destination: "맥도날드 쌍용점" },
    { date: "2024/11/16", station: "-", destination: "성환공단" },
    { date: "2024/11/17", station: "서울 주유소", destination: "서울역" },
  ];

  const itemsPerPage = 3; // 한 페이지당 표시할 항목 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  const totalPages = Math.ceil(allDestinations.length / itemsPerPage);

  // 현재 페이지 데이터 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDestinations = allDestinations.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="saved-destination">
      <h3>저장한 목적지</h3>
      <table>
        <thead>
          <tr>
            <th>등록일</th>
            <th>경유주유소</th>
            <th>목적지</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {currentDestinations.map((destination, index) => (
            <tr key={index}>
              <td name={`dest-date-${index}`}>{destination.date}</td>
              <td name={`dest-station-${index}`}>{destination.station}</td>
              <td name={`dest-destination-${index}`}>{destination.destination}</td>
              <td>
                <button
                  style={{
                    backgroundColor: "#f8f9fa",
                    border: "solid 1px #ccc",
                  }}
                  name={`delete-destination-${index}`}
                >
                  삭제
                </button>
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

export default SaveDest;
