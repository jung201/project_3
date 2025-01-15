import React, { useEffect, useState } from "react";
import "../../static/scss/Search/RouteSearch.scss";
import markerIcon from "../../static/images/icons/도착.png";
import { fetchsearch } from "../../service/apiService"; // API 연동 함수 가져오기

/* global Tmapv2 */

const getFilteredStations = (stations) => {
  if (stations.length === 0) return [];

  // 거리를 킬로미터로 변환
  const stationsInKilometers = stations.map((station) => ({
    ...station,
    distance: (station.distance / 1000).toFixed(2), // 미터 → 킬로미터 변환 및 소수점 2자리 유지
  }));

  // 최단거리 주유소
  const closestStation = stationsInKilometers.reduce((prev, curr) =>
    parseFloat(prev.distance) < parseFloat(curr.distance) ? prev : curr
  );

  // 최저단가 주유소
  const cheapestStation = stationsInKilometers.reduce((prev, curr) =>
    parseFloat(prev.price) < parseFloat(curr.price) ? prev : curr
  );

  // 중복 방지
  const result = [closestStation];
  if (closestStation !== cheapestStation) {
    result.push(cheapestStation);
  }

  return result;
};

const RouteSearch = ({
  mapRef,
  selectedDestination,
  selectedStation,
  onStationsUpdate,
}) => {
  const [markers, setMarkers] = useState([]); // 마커 관리
  const [polylines, setPolylines] = useState([]); // 경로 관리

  const clearMap = () => {
    // 기존 마커 제거
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);

    // 기존 경로 제거
    polylines.forEach((polyline) => polyline.setMap(null));
    setPolylines([]);
  };

  // 주유소 데이터 가져오기
  const fetchStations = async () => {
    try {
      const stationData = await fetchsearch(36.80732281, 127.1471658); // 출발지 위도, 경도
      console.log("받아온 주유소 데이터:", stationData);

      if (stationData && stationData.length > 0) {
        const filteredStations = getFilteredStations(stationData); // 최단거리, 최저단가 필터링
        onStationsUpdate(filteredStations); // 부모 컴포넌트(MainMapPage)로 데이터 전달
      } else {
        console.log("추천할 주유소가 없습니다.");
        onStationsUpdate([]); // 빈 데이터 전달
      }
    } catch (error) {
      console.error("주유소 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  // 경로 탐색 함수
  const searchRoute = (destination, station) => {
    if (!mapRef.current || !destination) return; // 지도 객체 또는 목적지가 없으면 종료
    console.log("탐색 경로 로직 실행");

    const headers = {
      "Content-Type": "application/json",
      appKey: "ykiQ5w0ftD9OWcnVnthjn3a7wr6HsgNW8rkLYp8t", // TMap API Key
    };

    const data = {
      startX: "127.1471658", // 출발지 경도
      startY: "36.80732281", // 출발지 위도
      passList: station ? `${station.lng},${station.lat}` : undefined, // 경유지 추가
      endX: destination.lng, // 도착지 경도
      endY: destination.lat, // 도착지 위도
      reqCoordType: "WGS84GEO",
      resCoordType: "EPSG3857",
      searchOption: "12",
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

        // 기존 경로 및 마커 제거
        clearMap();

        // 경로 표시
        const drawInfoArr = [];
        resultData.forEach((item) => {
          if (item.geometry.type === "LineString") {
            item.geometry.coordinates.forEach((coordinate) => {
              const point = new Tmapv2.Point(coordinate[0], coordinate[1]);
              const latLng = Tmapv2.Projection.convertEPSG3857ToWGS84GEO(point);
              drawInfoArr.push(new Tmapv2.LatLng(latLng._lat, latLng._lng));
            });

            const polyline = new Tmapv2.Polyline({
              path: drawInfoArr,
              strokeColor: "#FF0000",
              strokeWeight: 6,
              map: mapRef.current,
            });
            setPolylines((prev) => [...prev, polyline]);
          }
        });

        // 시작 마커
        const startMarker = new Tmapv2.Marker({
          position: new Tmapv2.LatLng(36.80732281, 127.1471658),
          map: mapRef.current,
          icon: {
            url: markerIcon,
            size: new Tmapv2.Size(32, 32),
          },
          title: "초기 위치(휴먼교육센터)",
        });
        setMarkers((prev) => [...prev, startMarker]);

        // 경유지 마커
        if (station) {
          const waypointMarker = new Tmapv2.Marker({
            position: new Tmapv2.LatLng(station.lat, station.lng),
            map: mapRef.current,
            icon: {
              url: markerIcon,
              size: new Tmapv2.Size(32, 32),
            },
            title: station.name || "경유지",
          });
          setMarkers((prev) => [...prev, waypointMarker]);
        }

        // 도착 마커
        const endMarker = new Tmapv2.Marker({
          position: new Tmapv2.LatLng(destination.lat, destination.lng),
          map: mapRef.current,
          icon: {
            url: markerIcon,
            size: new Tmapv2.Size(32, 32),
          },
          title: destination.name || "도착지",
        });
        setMarkers((prev) => [...prev, endMarker]);

        // 지도 중심 및 줌 조정
        mapRef.current.setZoom(12);
        mapRef.current.setCenter(
          new Tmapv2.LatLng(
            (destination.lat + 36.80732281) / 2,
            (destination.lng + 127.1471658) / 2
          )
        );
        // 팝업 표시
        new Tmapv2.InfoWindow({
          position: new Tmapv2.LatLng(
            destination.lat - 0.005,
            destination.lng + 0.05
          ),
          content: `
            <div class="info-popup">
              <div class="popup-header">${destination.name || "도착지"}</div>
              <div class="popup-info">소요 시간: ${Math.ceil(
                resultData[0].properties.totalTime / 60
              )}분</div>
              <div class="popup-info distance">남은 거리: ${(
                resultData[0].properties.totalDistance / 1000
              ).toFixed(2)}km</div>
              <button class="popup-button">목적지 저장</button>
            </div>
          `,
          type: 2, // HTML 타입 팝업
          map: mapRef.current,
        });
      })
      .catch((error) => console.error("경로 탐색 중 오류 발생:", error));
  };

  useEffect(() => {
    if (selectedDestination) {
      fetchStations(); // 주유소 데이터 가져오기
      searchRoute(selectedDestination, null); // 경유지 없이 기본 경로 탐색
    }
  }, [selectedDestination]);

  useEffect(() => {
    if (selectedStation) {
      searchRoute(selectedDestination, selectedStation); // 경유지를 포함한 경로 탐색
    }
  }, [selectedStation]);

  return null;
};

export default RouteSearch;
