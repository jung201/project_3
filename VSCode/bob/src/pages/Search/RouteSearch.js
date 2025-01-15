import React from "react";
import mypageImg from "../../static/images/icons/signin.PNG";
import navFiller from "../../static/images/icons/board.png";
import "../../static/scss/Search/RouteSearch.scss";

/* global Tmapv2 */
const RouteSearch = ({ mapRef, selectedDestination }) => {

    const searchRoute = (destination) => { // 경로 탐색 함수: 선택된 목적지로 경로를 탐색
        if (!mapRef.current || !destination) return; // 지도 객체 또는 목적지가 없으면 함수 종료
        //--------------------------------------------------------------------
        // const RouteSearch = ({ mapRef, selectedDestination, selectedStation }) => {
        //     const searchRouteWithWaypoint = () => {
        //         if (!mapRef.current || !selectedDestination || !selectedStation) return;
        //--------------------------------------------------------------------

        const headers = { // 요청 헤더 설정
            "Content-Type": "application/json", // JSON 형식 데이터 전송
            appKey: "ykiQ5w0ftD9OWcnVnthjn3a7wr6HsgNW8rkLYp8t", // TMap API Key
        };

        // 요청 데이터: 출발지와 도착지 정보 포함
        const data = {
            startX: "127.1471658", // 출발지 경도
            startY: "36.80732281", // 출발지 위도
            // passList: `${selectedStation.lng},${selectedStation.lat}`, // 경유지 추가
            endX: destination.lng, // 도착지 경도
            endY: destination.lat, // 도착지 위도
            reqCoordType: "WGS84GEO", // 요청 좌표계 타입
            resCoordType: "EPSG3857", // 응답 좌표계 타입
            searchOption: "12", // 이륜차 전용 도로
            trafficInfo: "N", // 교통 정보 사용 안 함
        };

        fetch("https://apis.openapi.sk.com/tmap/routes?version=1&format=json", {
            method: "POST",
            headers,
            body: JSON.stringify(data), // 요청 데이터를 JSON으로 변환
        })
            .then((response) => response.json()) // 응답 데이터를 JSON으로 변환
            .then((response) => {
                const resultData = response.features; // 경로 데이터 추출

                // 지도에 경로를 표시하기 위한 배열 초기화
                const drawInfoArr = [];
                resultData.forEach((item) => {
                    if (item.geometry.type === "LineString") {
                        const coordinates = item.geometry.coordinates; // 경로의 좌표 데이터를 읽어서 변환

                        coordinates.forEach((coordinate) => {
                            const point = new Tmapv2.Point(coordinate[0], coordinate[1]); // 좌표 생성
                            const latLng = Tmapv2.Projection.convertEPSG3857ToWGS84GEO(point); // 좌표 변환
                            drawInfoArr.push(new Tmapv2.LatLng(latLng._lat, latLng._lng)); // 변환된 좌표 추가
                        });

                        // 경로를 지도에 그리기
                        new Tmapv2.Polyline({
                            path: drawInfoArr, // 경로 좌표 배열
                            strokeColor: "#FF0000", // 빨간색 라인
                            strokeWeight: 6, // 경로 두께
                            map: mapRef.current, // 지도 객체
                        });
                    }
                });

                // 시작 마커
                new Tmapv2.Marker({
                    position: new Tmapv2.LatLng(36.80732281, 127.1471658), // 출발지 좌표
                    map: mapRef.current,
                    icon: { mypageImg }, // 출발지 마커 이미지
                    title:"초기 위치(휴먼교육센터)"
                });

                // 도착 마커
                new Tmapv2.Marker({
                    position: new Tmapv2.LatLng(destination.lat, destination.lng), // 도착지 좌표
                    map: mapRef.current,
                    icon: { navFiller }, // 도착지 마커 이미지
                });

                // 지도 줌 아웃 및 중심 변경
                mapRef.current.setZoom(12); // 줌 아웃
                mapRef.current.setCenter(
                    new Tmapv2.LatLng(
                        (destination.lat + 36.80732281) / 2, // 출발지와 도착지 중간 위도
                        (destination.lng + 127.1471658) / 2 // 출발지와 도착지 중간 경도
                    )
                );
                // 팝업 표시 
                new Tmapv2.InfoWindow({
                    position: new Tmapv2.LatLng(destination.lat - 0.005, destination.lng + 0.05), // 팝업 위치
                    content: `
                        <div class="info-popup">
                        <div class="popup-header">${destination.name || "도착지"}</div> <!-- 입력한 경로 이름 표시 -->
                        <div class="popup-info">소요 시간: ${Math.ceil(resultData[0].properties.totalTime / 60)}분</div>
                        <div class="popup-info distance">남은 거리: ${(resultData[0].properties.totalDistance / 1000).toFixed(2)}km</div>
                        <button class="popup-button">목적지 저장</button>
                        </div>
                    `,
                    type: 2, // HTML 타입 팝업
                    map: mapRef.current,
                });
            })
            .catch((error) => console.error("Error fetching route:", error));
    };

    // 선택된 목적지가 변경될 때마다 경로 탐색 실행
    React.useEffect(() => {
        if (selectedDestination) {
            searchRoute(selectedDestination);
        }
    });

    return null; // UI가 필요 없으므로 아무것도 렌더링하지 않음
};

export default RouteSearch;
