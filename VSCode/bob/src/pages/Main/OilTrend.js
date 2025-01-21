import { useState, useEffect } from "react";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OilTrend = () => {
  const [chartData, setChartData] = useState(null); // 그래프 데이터를 상태로 저장
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    // API 호출
    fetch("http://192.168.0.93:3006/api/oil-prices")
      .then((response) => response.json())
      .then((data) => {
        console.log("API 데이터:", data);
  
        // 날짜별 그룹화
        const labels = [...new Set(data.map((item) => item.IOP_DATE))]; // 날짜별 라벨 추출
        console.log("Labels:", labels);
  
        // 전국 평균 데이터 가공
        const nationalData = data
          .filter((item) => parseInt(item.IOP_REGION_ID) !== 5) // 전국(충남 제외)
          .reduce((acc, item) => {
            if (!acc[item.IOP_DATE]) acc[item.IOP_DATE] = [];
            acc[item.IOP_DATE].push(parseFloat(item.IOP_PRICE));
            return acc;
          }, {});
  
        const nationalAverage = labels.map(
          (date) =>
            nationalData[date]
              ? nationalData[date].reduce((sum, price) => sum + price, 0) /
                nationalData[date].length
              : 0
        );
  
        // 충남 평균 데이터 가공
        const chungnamAverage = labels.map((date) => {
          const chungnamPrices = data
            .filter(
              (item) =>
                parseInt(item.IOP_REGION_ID) === 5 && item.IOP_DATE === date
            )
            .map((item) => parseFloat(item.IOP_PRICE));
  
          return chungnamPrices.length > 0
            ? chungnamPrices.reduce((sum, price) => sum + price, 0) /
                chungnamPrices.length
            : 0;
        });
  
        console.log("National Average:", nationalAverage);
        console.log("Chungnam Average:", chungnamAverage);
  
        // 그래프 데이터 설정
        setChartData({
          labels,
          datasets: [
            {
              label: "전국 평균",
              data: nationalAverage,
              backgroundColor: "rgba(0, 123, 255, 0.6)",
              borderColor: "rgba(0, 123, 255, 1)",
              borderWidth: 1,
            },
            {
              label: "충남 평균",
              data: chungnamAverage,
              backgroundColor: "rgba(255, 193, 7, 0.6)",
              borderColor: "rgba(255, 193, 7, 1)",
              borderWidth: 1,
            },
          ],
        });
  
        setLoading(false); // 로딩 종료
      })
      .catch((error) => {
        console.error("데이터 로드 실패:", error);
        setLoading(false); // 로딩 종료
      });
  }, []);
  
  
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
        {/* 로딩 상태 처리 */}
        {loading ? (
          <p>데이터를 불러오는 중입니다...</p>
        ) : chartData ? ( // chartData가 null이 아닐 때만 Bar 컴포넌트 렌더링
          <div style={{ width: "450px", height: "250px" }}>
            <Bar data={chartData} options={options} />
          </div>
        ) : (
          <p>데이터를 가져올 수 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default OilTrend;
