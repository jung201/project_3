import React, { useEffect, useState } from "react";
import "../../static/scss/MyPage/SaveDest.scss";
import { fetchRouteHistory } from "../../service/apiService";
import { deleteRouteHistory } from "../../service/apiService";

const SaveDest = () => {
  const [destinations, setDestinations] = useState([]); //목적지 목록 state
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 3; // 한 페이지당 표시할 항목 수

  useEffect(() => {
    const loadDestinations = async () => {
      const userId = sessionStorage.getItem("userId");
      console.log("Retrieved userId from sessionStorage:", userId);

      if (!userId) {
        console.error("userId가 undefined입니다. 로그인 정보를 확인하세요.");
        return;
      }

      try {
        const data = await fetchRouteHistory(userId); // API 호출
        console.log("fetchRouteHistory 호출 결과:", data);

        // 데이터 매핑
        const formattedData = data.map((item) => {
          if (!item.destinationId) {
            console.warn("destinationId가 누락된 데이터 항목:", item);
          }
          return {
            destinationId: item.destinationId || null, // destinationId 기본값 설정
            date: item.urCreatedDate?.substring(0, 10) || "N/A",
            station: item.urStopoverName || "-",
            destination: item.urDestName || "목적지 없음",
          };
        });
        console.log("Formatted Data:", formattedData);

        setDestinations(formattedData);
      } catch (error) {
        console.error("목적지 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    loadDestinations();
  }, []);

  const handleDelete = async (indexInCurrentPage, destinationId) => {
    const userId = sessionStorage.getItem("userId");
    console.log("삭제 요청 - userId:", userId, "destinationId:", destinationId);

    if (!userId || !destinationId) {
      console.error(
        "유효하지 않은 userId 또는 destinationId:",
        userId,
        destinationId
      );
      return;
    }

    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const response = await deleteRouteHistory(userId, destinationId);
        console.log("삭제 성공:", response);

        // 삭제 후 리스트 업데이트
        const realIndex = (currentPage - 1) * itemsPerPage + indexInCurrentPage;
        const updatedList = [...destinations];
        updatedList.splice(realIndex, 1);
        setDestinations(updatedList);

        // 삭제 성공 메시지 표시
        alert("삭제 성공");
      } catch (error) {
        console.error("삭제 중 오류 발생:", error);
      }
    }
  };

  // 페이지 계산
  const totalPages = Math.ceil(destinations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDestinations = destinations.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
          {currentDestinations.map((dest, idx) => (
            <tr key={idx}>
              <td>{dest.date}</td>
              <td>{dest.station}</td>
              <td>{dest.destination}</td>
              <td>
                <button onClick={() => handleDelete(idx, dest.destinationId)}>
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
