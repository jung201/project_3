// import React, { useState } from "react";
import { Line } from "react-chartjs-2";

// Chart.js에서 필요한 모듈 가져오기
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OilTrend = () => {
  // 그래프 데이터
  const data = {
    labels: ["12.1", "12.8", "12.15", "12.23"], // X축 데이터
    datasets: [
      {
        label: "전국 평균",
        data: [1650, 1660, 1670, 1680], // Y축 데이터
        borderColor: "#007BFF", // 선 색깔
        backgroundColor: "rgba(0, 123, 255, 0.2)", // 선 아래 배경색
        tension: 0.4, // 선의 곡선 정도
      },
      {
        label: "충남 평균",
        data: [1550, 1560, 1570, 1580], // Y축 데이터
        borderColor: "#FFC107",
        backgroundColor: "rgba(255, 193, 7, 0.2)",
        tension: 0.4,
      },
    ],
  };

  // 그래프 옵션
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // 범례 위치
        labels: {
          color: "#333333", // 범례 텍스트 색상
        },
      },
      title: {
        display: true,
        color: "#333333", // 제목 색상
        font: {
          size: 2,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#333333", // X축 글자 색상
        },
      },
      y: {
        ticks: {
          color: "#333333", // Y축 글자 색상
        },
      },
    },
  };

  return (
    <div className="oil-trend">
      <div className="oil-img"></div>
      <div className="right">
        <h2>유가 추이</h2>
        {/* 그래프 */}
        <div style={{ width: "400px", height: "200px" }}>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default OilTrend;
