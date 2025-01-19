import React, { useState, useEffect } from 'react';
import '../../static/scss/Info/Sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { getBrandLogo } from './BrandLogoMap';

const Search = ({ stations, markerMap, closePopup }) => { // markerMap을 props로 추가
    const [sortOption, setSortOption] = useState('');
    const [sortedStations, setSortedStations] = useState([]);

    useEffect(() => {
        console.log("Received stations in Search:", stations || []); // 디버깅용 로그 추가

        // 속성 이름 매핑 및 거리 기본값 추가
        const mappedStations = (stations || []).map(station => ({
            brand: station.BRAND, // 실제 데이터 속성 이름에 맞게 수정
            name: station.NAME, // 실제 데이터 속성 이름에 맞게 수정
            price: station.PRICE, // 실제 데이터 속성 이름에 맞게 수정
            distance: station.DISTANCE || 0, // 거리 기본값 설정
        }));

        setSortedStations(mappedStations); // 초기화
    }, [stations]);

    const handleSortClick = (option) => {
        setSortOption(option);
        if (option === '낮은가격순') {
            const sorted = [...sortedStations].sort((a, b) => a.price - b.price);
            setSortedStations(sorted);
        } else if (option === '가까운순') {
            const sorted = [...sortedStations].sort((a, b) => a.distance - b.distance);
            setSortedStations(sorted);
        } else {
            setSortedStations(stations || []);
        }
    };

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
        <div className="search">
            <h3 style={{ textAlign: "left" }}> [ 근처 5km 반경 주유소들이에요! ] </h3>
            <div className="sort-options">
                <FontAwesomeIcon icon={faBars} style={{ marginRight: '30px' }} />
                <button
                    className={`sort-btn ${sortOption === '낮은가격순' ? 'active' : ''}`}
                    onClick={() => handleSortClick('낮은가격순')}
                >
                    낮은가격순
                </button>
                <span style={{ margin: "0px 10px" }}>  |  </span>
                <button
                    className={`sort-btn ${sortOption === '가까운순' ? 'active' : ''}`}
                    onClick={() => handleSortClick('가까운순')}
                >
                    가까운순
                </button>
            </div>
            <table className="index">
                <thead>
                    <tr>
                        <td style={{textAlign:'center'}}>주유소명</td>
                        <td>금액</td>
                        <td>거리</td>
                    </tr>
                </thead>
                <tbody>
                    {sortedStations.map((station, index) => (
                        <tr key={index}>
                            <td>
                                <span
                                    style={{ fontWeight: 'bold', marginRight: '5px', cursor: 'pointer' }}
                                    onClick={() => handleStationClick(station.name)} // 클릭 이벤트 추가
                                >
                                    <img 
                                        src={getBrandLogo(station.brand)} 
                                        alt={`${station.brand} 로고`} 
                                        style={{ width: '30px', height: 'auto', marginRight: '10px', verticalAlign: 'middle' }}
                                    /> {station.name || '정보 없음'}
                                </span>

                            </td>
                            <td>{station.price ? `${station.price}원` : '정보 없음'}</td>
                            <td>{station.distance ? `${(station.distance / 1000).toFixed(1)}km` : '정보 없음'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Search;
