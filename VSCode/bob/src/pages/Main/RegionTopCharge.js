import React, { useState } from "react";

const RegionTopCharge = () => {
    // 초기 충전소 데이터 설정
    const initialStations = [
        { region: "천안시", name: "천안시청 3주유소", score: 4.83, price: 450 },
        { region: "천안시", name: "천안시청 2주유소", score: 4.68, price: 430 },
        { region: "천안시", name: "샤인더 주유소", score: 4.45, price: 410 },
        { region: "천안시", name: "행복 주유소", score: 4.41, price: 420 },
        { region: "천안시", name: "천안역 주유소", score: 4.31, price: 400 },
    ];

    // 상태 관리: 주유소 목록
    const [chargeStations, setChargeStations] = useState(initialStations);

    // 가격순 정렬 함수
    const sortByPrice = () => {
        const sorted = [...chargeStations].sort((a, b) => a.price - b.price);
        setChargeStations(sorted);
    };

    // 평점순 정렬 함수
    const sortByScore = () => {
        const sorted = [...chargeStations].sort((a, b) => b.score - a.score);
        setChargeStations(sorted);
    };

    return (
        <div className="region-container">
            {/* 제목 */}
            <h2 className="title">우리지역 Top5 주유소</h2>

            {/* 지역 선택 드롭다운 */}
            <div className="controls">
                <select className="dropdown">
                    <option>천안시</option>
                    <option>천안시</option>
                    <option>천안시</option>
                </select>

                {/* 정렬 버튼 */}
                <div className="sort-buttons">
                    <button onClick={sortByPrice}>가격순</button>
                    <button onClick={sortByScore}>평점순</button>
                </div>
            </div>

            {/* 테이블 */}
            <table className="station-table">
                <thead>
                    <tr>
                        <th>지역</th>
                        <th>주유소명</th>
                        <th>가격</th>
                        <th>평점</th>
                    </tr>
                </thead>
                <tbody>
                    {chargeStations.map((station, index) => (
                        <tr key={index}>
                            <td>{station.region}</td>
                            <td>{station.name}</td>
                            <td>{station.price}원</td>
                            <td>{station.score}점</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RegionTopCharge;
