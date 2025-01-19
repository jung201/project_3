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
            if (window.matchMedia("(max-width: 450px)").matches) {
                closePopup();
            }
        } else {
            console.warn("Marker not found for station:", stationName);
        }
    };

    return (
        <div className="recommendation">
            <h3> [ 이 주유소, 어떠신가요? ] </h3>

            {/* 가장 저렴한 주유소 */}
            {cheapestStation && (
                <div className="station">
                    <div className="station-container">
                        <div className="station-header">
                            <div className="sort-indicator price">저렴해요</div>
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
                        <div className="station-body-container">
                            <div className="station-body">
                            <table className="rTable">
                                <tr>
                                    <th style={{color: 'rgb(214, 0, 0)'}}>오늘의 가격</th>
                                    <th>주유소까지</th>
                                </tr>
                                <tr>
                                    <td><span className="station-price" style={{color: 'rgb(214, 0, 0)'}}>{cheapestStation?.price || "N/A"}원</span></td>
                                    <td><span className="station-distance">{cheapestStation?.distance || "N/A"}km</span></td>
                                </tr>
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 가장 가까운 주유소 */}
            {nearestStation && (
                <div className="station">
                    <div className="station-container">
                        <div className="station-header" >
                            <div className="sort-indicator distance">가까워요</div>
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
                        <div className="station-body-container">
                            <div className="station-body">
                                <table className="rTable">
                                <tr>
                                    <th>오늘의 가격</th>
                                    <th style={{color: 'rgb(214, 0, 0)'}}>주유소까지</th>
                                </tr>
                                <tr>
                                    <td><span className="station-price">{nearestStation.price}원</span></td>
                                    <td><span className="station-distance" style={{color: 'rgb(214, 0, 0)'}}>{nearestStation.distance}km</span></td>
                                </tr>
                                
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Recommend;
