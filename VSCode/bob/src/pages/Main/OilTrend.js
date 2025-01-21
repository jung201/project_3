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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OilTrend = () => {
  const [chartData, setChartData] = useState(null); // 그래프 데이터를 상태로 저장
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.0.93:3006/api/oil-prices");
        const data = await response.json();
        console.log("API 데이터:", data);

        // 날짜별 레이블 생성 및 최대 5일까지만 표시
        const labels = data
          .slice(0, 5) // 최대 5개 데이터만 가져오기
          .map((item) => {
            const date = item?.iop_DATE?.split("T")[0]; // 'T' 이전의 날짜 부분만 추출
            if (date) {
              const [year, month, day] = date.split("-");
              return `${month}월 ${day}일`; // "01월 05일" 형식으로 변환
            }
            return null; // 유효하지 않은 데이터 처리
          })
          .filter(Boolean); // null 제거

        console.log("Labels:", labels);

        // 데이터를 날짜 형식으로 그룹화
        const groupByDate = (data, regionId) =>
          data
            .filter((item) => parseInt(item?.iop_REGION_ID) === regionId && item?.iop_PRICE)
            .reduce((acc, item) => {
              const date = item.iop_DATE?.split("T")[0];
              if (date) {
                const formattedDate = `${date.split("-")[1]}월 ${date.split("-")[2]}일`;
                if (!acc[formattedDate]) acc[formattedDate] = [];
                acc[formattedDate].push(parseFloat(item.iop_PRICE));
              }
              return acc;
            }, {});

        const nationalData = groupByDate(data, 1); // 1: 전국 데이터 예시
        const chungnamData = groupByDate(data, 5); // 5: 충남 데이터 예시

        // 평균 계산
        const calculateAverage = (dataGroup, labels) =>
          labels.map(
            (label) =>
              dataGroup[label]?.reduce((sum, price) => sum + price, 0) /
                dataGroup[label]?.length || 0
          );

        const nationalAverage = calculateAverage(nationalData, labels);
        const chungnamAverage = calculateAverage(chungnamData, labels);

        console.log("National Average:", nationalAverage);
        console.log("Chungnam Average:", chungnamAverage);

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

        setLoading(false);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 그래프 옵션
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#333333",
        },
      },
      title: {
        display: true,
        text: "유가 추이",
        color: "#333333",
        font: {
          size: 20,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#333333",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#333333",
          stepSize: 100, // Y축 100원 단위 설정
        },
      },
    },
  };

  return (
    <div className="oil-trend">
      <div className="oil-img"></div>
      <div className="right">
        <h2>유가 추이</h2>
        {loading ? (
          <p>데이터를 불러오는 중입니다...</p>
        ) : chartData ? (
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
