import React, { useEffect } from 'react';
import '../../static/scss/Search/Maps.scss';

const DestMap = ({ selectedDestination, waypoint, onRecommendPopup }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=8d4462d3e1aeb898f4a7fde7440dec38&autoload=false&libraries=services`;
        script.async = true;

        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById('map');
                const options = {
                    center: new window.kakao.maps.LatLng(37.497175, 127.027926), // 초기 지도 중심 (강남역)
                    level: 3,
                };

                const map = new window.kakao.maps.Map(container, options);

                const bounds = new window.kakao.maps.LatLngBounds();

                // 출발지 마커 (강남역)
                const departureMarker = new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(37.497175, 127.027926),
                    map,
                });
                bounds.extend(new window.kakao.maps.LatLng(37.497175, 127.027926));

                // 도착지 마커 및 InfoWindow
                if (selectedDestination) {
                    const destPosition = new window.kakao.maps.LatLng(
                        selectedDestination.lat,
                        selectedDestination.lng
                    );

                    const destMarker = new window.kakao.maps.Marker({
                        position: destPosition,
                        map,
                    });

                    const infoWindow = new window.kakao.maps.InfoWindow({
                        content: `
                            <div style="padding:10px; text-align:center; margin:0;">
                                <strong>${selectedDestination.name}</strong><br/>
                                <span style="font-size:10pt;">${selectedDestination.address}</span><br/>
                                <button id="setDestination" style="background-color: rgb(7,34,52); color: white; border: none; padding: 5px; cursor: pointer; margin: 10px; width:95%;">
                                    도착지로 설정
                                </button>
                            </div>
                        `,
                    });
                    infoWindow.open(map, destMarker);

                    // 지도 중앙 이동
                    map.setCenter(destPosition);

                    // InfoWindow 버튼 클릭 이벤트
                    setTimeout(() => {
                        const button = document.getElementById('setDestination');
                        if (button) {
                            button.onclick = () => {
                                bounds.extend(destPosition); // 마커 포함
                                if (waypoint) {
                                    bounds.extend(
                                        new window.kakao.maps.LatLng(
                                            waypoint.lat,
                                            waypoint.lng
                                        )
                                    );
                                }
                                map.setBounds(bounds); // 화면에 모든 마커 표시
                                onRecommendPopup(); // Recommend 팝업 열기
                            };
                        }
                    }, 0);
                }

                // 경유지 마커
                if (waypoint) {
                    const waypointPosition = new window.kakao.maps.LatLng(
                        waypoint.lat,
                        waypoint.lng
                    );

                    const waypointMarker = new window.kakao.maps.Marker({
                        position: waypointPosition,
                        map,
                    });

                    bounds.extend(waypointPosition);
                }
            });
        };

        script.onerror = () => {
            console.error('카카오 지도 JavaScript SDK 로드에 실패했습니다.');
        };

        document.head.appendChild(script);

        return () => {
            const existingScript = document.querySelector(
                'script[src*="kakao.com"]'
            );
            if (existingScript) {
                document.head.removeChild(existingScript);
            }
        };
    }, [selectedDestination, waypoint, onRecommendPopup]);

    return <div id="map" style={{ width: '100%', height: '500px' }}></div>;
};

export default DestMap;
