import React, { useState,useEffect } from "react";
import { fetchTopStations } from "../../service/apiService";

const RegionTopCharge = () => {
    const [chargeStations, setChargeStations] = useState([]);
    const [loading, setLoading] = useState(true);

     // sidocd와 지역 이름 매핑 객체
     const regionMap = {
        "05": "충남",
        // 필요한 sidocd와 지역 이름을 여기에 추가
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchTopStations("05"); // sidocd 값 전달
                setChargeStations(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching stations:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (chargeStations.length === 0) {
        return <div>No data available.</div>;
    }

    // 지역 이름 추출 함수 (sidocd 기준)
    const getRegionName = (sidocd) => {
        return regionMap[sidocd] || "알 수 없음"; // 매핑되지 않은 경우 기본값
    };
    
    return (
        <div className="region-container">
            {/* 제목 */}
            <h2 className="title">우리지역 Top5 주유소</h2>

            {/* 테이블 */}
            <table className="station-table">
                <thead>
                    <tr>
                        <th>지역</th>
                        <th>주유소명</th>
                        <th>가격</th>
                    </tr>
                </thead>
                <tbody>
                    {chargeStations.map((station, index) => (
                        <tr key={index}>
                            <td>{getRegionName("05")}</td>
                            <td>{station.lsName}</td>
                            <td>{station.lsPrice}원</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RegionTopCharge;
