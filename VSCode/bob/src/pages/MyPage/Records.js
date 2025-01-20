import React, { useState, useEffect } from "react";
import {
  fetchFuelRecords,
  saveFuelRecord,
  deleteFuelRecord,
} from "../../service/apiService";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import RegistRecord from "./RegistRecord"; // RegistRecord 컴포넌트 import
import { formatDate } from "../../utils/dateUtils";
import "../../static/scss/MyPage/Records.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// ========================================================================

const Records = () => {
  const [showRegistModal, setShowRegistModal] = useState(false); // RegistRecord 모달 상태
  const [allData, setAllData] = useState([]); // 초기 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [editRecord, setEditRecord] = useState(null); // 수정할 데이터

  const userId = sessionStorage.getItem("userId"); // 로그인한 사용자 ID 가져오기
  const itemsPerPage = 8; // 페이지 당 항목 수
  const totalPages = Math.ceil(allData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = allData.slice(startIndex, startIndex + itemsPerPage);

  //=============================================================================

  // API 호출로 주유 기록 불러오기
  useEffect(() => {
    const loadFuelRecords = async () => {
      try {
        const records = await fetchFuelRecords(userId);
        setAllData(records);
      } catch (error) {
        console.error("주유 기록 불러오기 실패:", error);
      }
    };
    loadFuelRecords();
  }, [userId]);

  //=============================================================================

  // 새로운 주유 기록 추가
  const addRecord = async (record) => {
    if (!record.uuCoastDate || !record.uuStation || !record.uuCoast) {
      alert("모든 필드를 입력해 주세요!");
      return;
    }
    try {
      const newRecord = await saveFuelRecord({
        ...record,
        uuCreatedId: userId,
      });
      const updatedData = record.uuId
        ? allData.map((item) =>
            item.uuId === record.uuId ? { ...item, ...record } : item
          )
        : [...allData, newRecord];
      setAllData(updatedData);
      alert(record.uuId ? "수정이 완료되었습니다." : "등록이 완료되었습니다.");
      
      // 페이지 새로고침
      window.location.reload();
    } catch (error) {
      console.error("기록 저장 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  const handleEdit = (record) => {
    setEditRecord(record); // 수정할 데이터 설정
    setShowRegistModal(true); // 모달 열기
  };

  //=============================================================================

  // 주유 기록 삭제
  const handleDelete = async (recordId) => {
    if (window.confirm("삭제하시겠습니까?")) {
      try {
        await deleteFuelRecord(recordId);
        setAllData(allData.filter((record) => record.uuId !== recordId));
        alert("삭제가 완료되었습니다.");
      } catch (error) {
        console.error("삭제 실패:", error);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  //========================================================================

  // 월별 데이터 계산
  const monthlyAmounts = Array(12).fill(0);
  allData.forEach((record) => {
    // date가 유효한 경우에만 처리
    if (record.date) {
      const month = parseInt(record.uuCoastDate.split("-")[1], 10) - 1; // '-' 기준으로 split
      monthlyAmounts[month] += record.uuCoast;
    } else {
      console.warn("유효하지 않은 date 값:", record);
    }
  });

  //========================================================================

  // 차트 데이터
  const chartData = {
    labels: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    datasets: [
      {
        label: "주유 금액",
        data: Array(12)
          .fill(0)
          .map((_, i) =>
            allData
              .filter((record) => new Date(record.uuCoastDate).getMonth() === i)
              .reduce((sum, record) => sum + record.uuCoast, 0)
          ),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  //========================================================================

  return (
    <div className="fuel-records">
      <div className="header">
        <h3>월별 주유 기록</h3>
        <button
          name="registerFuelRecord"
          onClick={() => setShowRegistModal(true)}
        >
          등록하기
        </button>
      </div>

      <div className="chart-container">
        <Bar
          data={chartData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>날짜</th>
            <th>주유소명</th>
            <th>주유금액</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((record, index) => (
            <tr key={index}>
              <td>{formatDate(record.uuCoastDate)}</td>
              <td>{record.uuStation || "N/A"}</td>
              <td>{record.uuCoast ? `${record.uuCoast}원` : "0원"}</td>
              <td>
                <button onClick={() => handleEdit(true)}>수정</button>
              </td>
              <td>
                <button onClick={() => handleDelete(record.uuId)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

      {showRegistModal && (
        <RegistRecord
          setShowRegistModal={setShowRegistModal}
          addRecord={addRecord}
          initialData={editRecord} // 수정할 데이터 전달
        />
      )}
    </div>
  );
};

export default Records;
