// import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

// Chart.js에서 필요한 모듈 가져오기
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
        backgroundColor: "rgba(0, 123, 255, 0.6)", // 막대 색깔
        borderColor: "rgba(0, 123, 255, 1)", // 막대 테두리 색깔
        borderWidth: 1, // 막대 테두리 두께
      },
      {
        label: "충남 평균",
        data: [1550, 1560, 1570, 1580], // Y축 데이터
        backgroundColor: "rgba(255, 193, 7, 0.6)",
        borderColor: "rgba(255, 193, 7, 1)",
        borderWidth: 1,
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
        text: "유가 추이",
        color: "#333333", // 제목 색상
        font: {
          size: 20,
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
        <div style={{ width: "450px", height: "250px" }}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default OilTrend;
