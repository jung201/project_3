import React, { useState } from "react";
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
import "../../static/scss/MyPage/Records.scss";

// Chart.js 구성 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Records = () => {
  const [showRegistModal, setShowRegistModal] = useState(false); // RegistRecord 모달 상태

  // 예제 데이터
  const allData = [
    { date: "2024/11/10", station: "만수르 주유소", amount: 15000 },
    { date: "2024/12/31", station: "천안 주유소", amount: 8000 },
    { date: "2024/11/10", station: "샤우디 주유소", amount: 1553 },
    { date: "2024/11/10", station: "농협클린주유소", amount: 1554 },
    { date: "2024/11/10", station: "쌍용주유소", amount: 1555 },
    { date: "2024/12/01", station: "서울 주유소", amount: 20000 },
    { date: "2024/12/02", station: "부산 주유소", amount: 10000 },
    { date: "2024/12/03", station: "대구 주유소", amount: 5000 },
    { date: "2024/12/04", station: "광주 주유소", amount: 7000 },
    { date: "2024/12/05", station: "대전 주유소", amount: 9000 },
  ];

  const itemsPerPage = 8; // 페이지 당 항목 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  const totalPages = Math.ceil(allData.length / itemsPerPage);

  // 현재 페이지 데이터 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = allData.slice(startIndex, startIndex + itemsPerPage);

  // 차트 데이터
  const chartData = {
    labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월", ],
    datasets: [
      {
        label: "주유 금액",
        data: [70000, 80000, 75000, 30000, 25000, 10000, 70000,15000,20000,10000,15000,30000],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false, // 차트 상단 레이블 숨김
      },
    },
  };

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

      {/* 차트 */}
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* 주유 기록 테이블 */}
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
              <td name="recordDate">{record.date}</td>
              <td name="recordStation">{record.station}</td>
              <td name="recordAmount">{record.amount}원</td>
              <td name="mod">
                <button
                  onClick={() => setShowRegistModal(true)}
                >수정</button>
              </td>
              <td name="delete">
                <button
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

      {/* RegistRecord 모달 */}
      {showRegistModal && (
        <RegistRecord setShowRegistModal={setShowRegistModal} />
      )}
    </div>
  );
};

export default Records;
