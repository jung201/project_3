import React from "react";

/* global Tmapv2 */
const RouteSearch = ({ mapRef, selectedDestination, onRouteDataFetched }) => {
    const searchRoute = (destination) => {
        if (!mapRef.current || !destination) return;

        const headers = {
            "Content-Type": "application/json",
            appKey: "ykiQ5w0ftD9OWcnVnthjn3a7wr6HsgNW8rkLYp8t", // TMap API Key
        };

        const data = {
            startX: "127.1471658", // 출발지 경도
            startY: "36.80732281", // 출발지 위도
            endX: destination.lng, // 도착지 경도
            endY: destination.lat, // 도착지 위도
            reqCoordType: "WGS84GEO",
            resCoordType: "EPSG3857",
            searchOption: "12", // 이륜차 전용 도로
            trafficInfo: "N",
        };

        fetch("https://apis.openapi.sk.com/tmap/routes?version=1&format=json", {
            method: "POST",
            headers,
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((response) => {
                const resultData = response.features;

                // 경로 표시
                const drawInfoArr = [];
                resultData.forEach((item) => {
                    if (item.geometry.type === "LineString") {
                        const coordinates = item.geometry.coordinates;

                        coordinates.forEach((coordinate) => {
                            const point = new Tmapv2.Point(coordinate[0], coordinate[1]);
                            const latLng = Tmapv2.Projection.convertEPSG3857ToWGS84GEO(point);
                            drawInfoArr.push(new Tmapv2.LatLng(latLng._lat, latLng._lng));
                        });

                        // 경로를 지도에 그리기
                        new Tmapv2.Polyline({
                            path: drawInfoArr,
                            strokeColor: "#FF0000", // 빨간색 라인
                            strokeWeight: 6,
                            map: mapRef.current,
                        });
                    }
                });

                // 지도 줌 아웃 및 중심 변경
                mapRef.current.setZoom(12); // 줌 아웃
                mapRef.current.setCenter(
                    new Tmapv2.LatLng(
                        (destination.lat + 36.80732281) / 2,
                        (destination.lng + 127.1471658) / 2
                    )
                );
                onRouteDataFetched(resultData); // MainMapPage로 데이터 전달
            })
            .catch((error) => console.error("Error fetching route:", error));
    };

    React.useEffect(() => {
        if (selectedDestination) {
            searchRoute(selectedDestination);
        }
    }, [selectedDestination]);

    return null; // UI가 필요 없으므로 아무것도 렌더링하지 않음
};

export default RouteSearch;
