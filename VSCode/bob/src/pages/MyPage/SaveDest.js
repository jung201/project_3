import React, { useEffect, useState } from "react";
import "../../static/scss/MyPage/SaveDest.scss";
import { fetchRouteHistory } from "../../service/apiService";
import { deleteRouteHistory } from "../../service/apiService";

const SaveDest = () => {
  //목적지 목록 state
  const [destinations, setDestinations] = useState([]);
  //페이지네이션 관련 state
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 3; // 한 페이지당 표시할 항목 수
  const userId = sessionStorage.getItem("userId");

  //컴포넌트 마운트 시 목적지 리스트를 가져옴
  useEffect(() => {
    const loadDestinations = async () => {
      if (!userId) {
        console.error("로그인이 필요합니다.");
        return;
      }

      try {
        // 백엔드에서 호출
        const data = await fetchRouteHistory(userId);
        console.log("가져온 목적지 데이터:", data);

        // 리스트 저장
        const newDestinations = data.map((item) => ({
          id: item.destinationId, // 목적지 ID
          date: item.urCreatedDate?.substring(0, 10) || "-", // 등록일
          station: item.urStopoverName || "-", // 경유 주유소
          destination: item.urDestName || "-", // 목적지
        }));

        setDestinations(newDestinations); // 상태 업데이트
      } catch (error) {
        console.error("목적지 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    loadDestinations();
  }, [userId]);

  // ----------------------------------------------------------------------------

  // 삭제 버튼 클릭 시 호출
  const handleDelete = async (indexInCurrentPage, destinationId) => {
    try {
      if (!destinationId) {
        console.error("destinationId가 유효하지 않습니다:", destinationId);
        return;
      }

      const realIndex = (currentPage - 1) * itemsPerPage + indexInCurrentPage; // 실제 인덱스 계산
      const response = await deleteRouteHistory(userId, destinationId); // API 호출
      console.log("삭제 결과:", response);

      // 삭제 성공 시 상태 업데이트
      const updatedList = [...destinations];
      updatedList.splice(realIndex, 1);
      setDestinations(updatedList);

      // 페이지 재조정
      if (
        updatedList.length <= (currentPage - 1) * itemsPerPage &&
        currentPage > 1
      ) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
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
            <tr key={dest.id}>
              <td>{dest.date}</td>
              <td>{dest.station}</td>
              <td>{dest.destination}</td>
              <td>
                <button
                  onClick={() => handleDelete(idx, dest.id)} // 삭제 시 destinationId 전달
                  style={{
                    backgroundColor: "#f8f9fa",
                    border: "solid 1px #ccc",
                  }}
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
