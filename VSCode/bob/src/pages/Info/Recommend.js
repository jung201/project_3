import React, { useEffect, useState } from 'react';
import '../../static/scss/Info/Sidebar.scss';
import { getBrandLogo } from './BrandLogoMap';

const Recommend = ({ stations, markerMap, closePopup }) => { // markerMap 추가
    const [cheapestStation, setCheapestStation] = useState(null);
    const [nearestStation, setNearestStation] = useState(null);

    useEffect(() => {
        if (stations && stations.length > 0) {
            console.log("Received stations in Recommend:", stations);

            // 데이터 속성 이름 매핑 및 거리 변환
            const mappedStations = stations.map(station => ({
                brand: station.BRAND,
                name: station.NAME,
                price: station.PRICE,
                distance: (station.DISTANCE / 1000).toFixed(1), // m -> km 변환, 소수점 1자리로 고정
            }));

            const sortedByPrice = [...mappedStations].sort((a, b) => a.price - b.price);
            setCheapestStation(sortedByPrice[0]);

            const sortedByDistance = [...mappedStations].sort((a, b) => a.distance - b.distance);
            setNearestStation(sortedByDistance[0]);
        }
    }, [stations]);

    // 주유소 이름 클릭 이벤트
    const handleStationClick = (stationName) => {
        if (markerMap && markerMap.has(stationName)) {
            const marker = markerMap.get(stationName);
            // 마커의 위치 가져오기
            const markerPosition = marker.getPosition();
        
            // 지도 중심을 마커 위치로 이동
            marker.getMap().setCenter(markerPosition);

            window.kakao.maps.event.trigger(marker, 'click'); // 마커 클릭 이벤트 트리거
            closePopup(); // 팝업 닫기 호출
        } else {
            console.warn("Marker not found for station:", stationName);
        }
    };

    return (
        <div className="recommendation">
            <h3>주변 주유소 추천</h3>

            {/* 가장 저렴한 주유소 */}
            {cheapestStation && (
                <div className="station">
                    <div className="station-container">
                        <div className="station-header">
                            <div className="sort-indicator price">가격순</div>
                            <span className="station-brand">
                                <img 
                                    src={getBrandLogo(cheapestStation.brand)} 
                                    alt={`${cheapestStation.brand} 로고`} 
                                    className="station-logo"
                                />
                            </span>
                            <span 
                                className="station-name"
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleStationClick(cheapestStation.name)} // 클릭 이벤트 추가
                            >
                                {cheapestStation?.name || "정보 없음"}
                            </span>
                        </div>
                        <br />
                        <div className="station-body-container">
                            <div className="station-body">
                                <span className="station-price">- 가격: {cheapestStation?.price || "N/A"}원</span>
                            </div>
                            <div className="station-body">
                                <span className="station-distance">- 거리: {cheapestStation?.distance || "N/A"}km</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 가장 가까운 주유소 */}
            {nearestStation && (
                <div className="station">
                    <div className="station-container">
                        <div className="station-header">
                            <div className="sort-indicator distance">거리순</div>
                            <span className="station-brand">
                                <img 
                                    src={getBrandLogo(nearestStation.brand)} 
                                    alt={`${nearestStation.brand} 로고`} 
                                    className="station-logo"
                                />
                            </span>
                            <span 
                                className="station-name" 
                                onClick={() => handleStationClick(nearestStation.name)} // 클릭 이벤트 추가
                                style={{ cursor: 'pointer' }}
                            >
                                {nearestStation.name}
                            </span>
                        </div>
                        <br />
                        <div className="station-body-container">
                            <div className="station-body">
                                <span className="station-price">- 가격: {nearestStation.price}원</span>
                            </div>
                            <div className="station-body">
                                <span className="station-distance">- 거리: {nearestStation.distance}km</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Recommend;
