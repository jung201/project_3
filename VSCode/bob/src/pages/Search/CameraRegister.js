import React, { useEffect, useState } from 'react';
import '../../static/scss/Search/CameraRegister.scss';

const CameraRegister = ({ onClose }) => {
    const [markerPosition, setMarkerPosition] = useState({
        lat: 37.497175, // 강남역 기본 좌표
        lng: 127.027926,
    });

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=8d4462d3e1aeb898f4a7fde7440dec38&autoload=false`;
        script.async = true;

        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById('map');
                const options = {
                    center: new window.kakao.maps.LatLng(markerPosition.lat, markerPosition.lng),
                    level: 3,
                };

                const map = new window.kakao.maps.Map(container, options);

                const marker = new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(markerPosition.lat, markerPosition.lng),
                    map: map,
                    draggable: true, // 마커를 드래그 가능하게 설정
                });

                const customOverlay = new window.kakao.maps.CustomOverlay({
                    position: marker.getPosition(),
                    content: `<div class="custom-marker">
                                <span>후방카메라 등록</span>
                                <button class="save-btn">등록하기</button>
                              </div>`,
                    yAnchor: 1.5,
                    clickable: true,
                });
                customOverlay.setMap(map);

                // 마커 드래그 후 위치 변경
                window.kakao.maps.event.addListener(marker, 'dragend', () => {
                    const position = marker.getPosition();
                    setMarkerPosition({ lat: position.getLat(), lng: position.getLng() });

                    // Overlay 위치 업데이트
                    customOverlay.setPosition(position);
                });

                // 등록 버튼 클릭 이벤트
                setTimeout(() => {
                    const saveButton = document.querySelector('.save-btn');
                    saveButton.onclick = () => {
                        console.log('후방카메라 등록 좌표:', markerPosition);
                        alert('후방카메라가 등록되었습니다.');
                        onClose();
                    };
                }, 0);
            });
        };

        document.head.appendChild(script);

        return () => {
            const existingScript = document.querySelector('script[src*="kakao.com"]');
            if (existingScript) {
                document.head.removeChild(existingScript);
            }
        };
    }, [markerPosition, onClose]);

    return <div id="map" style={{ width: '100%', height: '500px' }}></div>;
};

export default CameraRegister;
