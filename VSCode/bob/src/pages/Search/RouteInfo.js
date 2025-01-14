import React from "react";

/* global Tmapv2 */
const RouteInfo = ({ mapRef, routeData }) => {

    // 경로 데이터를 받아 마커와 팝업 표시
    React.useEffect(() => {
        if (!mapRef.current || !routeData) return;

        // 기존 마커와 경로 초기화
        mapRef.current.clearOverlays();

        routeData.forEach((point, index) => {
            const { lat, lng, distance, time } = point;

            // 마커 이미지 설정
            const markerIcon =
                index === 0
                    ? "/custom-icons/start.png" // 출발 마커 이미지
                    : index === routeData.length - 1
                        ? "/custom-icons/end.png" // 도착 마커 이미지
                        : "/custom-icons/waypoint.png"; // 경유지 마커 이미지

            // 마커 생성
            const marker = new Tmapv2.Marker({
                position: new Tmapv2.LatLng(lat, lng),
                map: mapRef.current,
                icon: markerIcon,
                title: `Point ${index + 1}`,
            });

            // 팝업 내용
            const infoWindowContent = `
                <div style="padding:10px; font-size:14px;">
                    <strong>${index === 0 ? "출발지" : index === routeData.length - 1 ? "도착지" : "경유지"}</strong>
                    <br />남은 거리: ${distance.toFixed(2)} km
                    <br />소요 시간: ${Math.ceil(time / 60)} 분
                </div>
                `;

            // 팝업 추가
            const infoWindow = new Tmapv2.InfoWindow({
                position: new Tmapv2.LatLng(lat, lng),
                content: infoWindowContent,
                type: 2, // HTML Type
                map: mapRef.current,
            });

            marker.addListener("click", () => {
                infoWindow.setVisible(true);
            });
        });
    }, [mapRef, routeData]);

    return null;
};

export default RouteInfo;
