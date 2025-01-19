import React, { useEffect, useState } from "react";
import "../../static/scss/Search/RouteSearch.scss";
import 도착Icon from "../../static/images/icons/도착.png";
import 경유Icon from "../../static/images/icons/경유.png";
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

//============================================================================

const RouteSearch = ({
  mapRef,
  selectedDestination,
  selectedStation,
  onStationsUpdate,
  showRecommendPopup,

  
}) => {
  const [markers, setMarkers] = useState([]);
  const [polylines, setPolylines] = useState([]);
  const [infoPopup, setInfoPopup] = useState({
    time: "",
    distance: "",
    name: "",
  }); // 오른쪽 하단 UI 상태 관리

  //============================================================================

  // 목적지 저장 함수 
  const handleSaveDestination = async () => {
    try {
      // 경유 주유소명이 있으면 사용, 없으면 빈 문자열
      const stopoverName = selectedStation ? selectedStation.name : "";
      const destName = infoPopup.name; // 목적지 한글 이름
      const distance = infoPopup.distance; // km(문자열)

      const body = {
        urStopoverName: stopoverName,
        urDestName: destName,
        urDistance: distance, // 필요시 Number 변환
      };

      // 백엔드 API 호출
      const response = await fetch("http://192.168.0.93:3006/search/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("서버 응답 실패");
      }
      const resultText = await response.text();
      if (resultText === "OK") {
        alert("목적지 저장 성공!");
      } else {
        alert("목적지 저장 실패: " + resultText);
      }
    } catch (err) {
      console.error(err);
      alert("오류: " + err.message);
    }
  };

  // ==========================================================================

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
        onStationsUpdate([]); // 빈 데이터 전달
      }
    } catch (error) {
      console.error("주유소 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  // **범위 -> Zoom을 단순 계산하는 헬퍼 함수 (예시)**
  const getZoomLevel = (latDiff, lngDiff) => {
    const maxDiff = Math.max(latDiff, lngDiff);

    if (maxDiff > 5) {
      return 7; // 매우 넓은 범위
    } else if (maxDiff > 2) {
      return 7;
    } else if (maxDiff > 1) {
      return 9;
    } else if (maxDiff > 0.5) {
      return 10;
    } else if (maxDiff > 0.2) {
      return 11;
    } else if (maxDiff > 0.1) {
      return 12;
    } else if (maxDiff > 0.05) {
      return 13;
    } else {
      return 14; // 매우 좁은 범위
    }
  };

  //============================================================================

  // 경로 탐색 함수
  const searchRoute = (destination, station) => {
    if (!mapRef.current) {
      console.error("지도 객체 또는 목적지가 설정되지 않았습니다.");
      alert("지도가 준비되지 않았습니다. 다시 시도해주세요.");
      return;
    }

    if (!destination) {
      console.error("목적지(destination)가 설정되지 않았습니다.");
      alert("목적지가 설정되지 않았습니다. 다시 시도해주세요.");
      return;
    }

    if (station && (!station.lng || !station.lat)) {
      console.error("경유지 좌표가 잘못되었습니다:", station);
      alert("경유지 좌표가 유효하지 않습니다. 다시 선택해주세요.");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      appKey: "ykiQ5w0ftD9OWcnVnthjn3a7wr6HsgNW8rkLYp8t", // TMap API Key
    };

    const passList = station ? `${station.lng},${station.lat}` : undefined;

    const data = {
      startX: "127.1471658", // 출발지 경도
      startY: "36.80732281", // 출발지 위도
      passList: passList, // 경유지 추가
      endX: destination.lng, // 도착지 경도
      endY: destination.lat, // 도착지 위도
      reqCoordType: "WGS84GEO",
      resCoordType: "EPSG3857",
      searchOption: "12",
      trafficInfo: "N",
    };

    console.log("API 요청 데이터:", data);

    // =====================================================================

    fetch("https://apis.openapi.sk.com/tmap/routes?version=1&format=json", {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `API 요청 실패: ${response.status} - ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((response) => {
        const resultData = response.features;

        if (!resultData || resultData.length === 0) {
          alert("경로를 탐색할 수 없습니다.");
          return;
        }

        clearMap(); // 기존 경로 및 마커 제거

        //========================================================================

        // 경로 표시
        const drawInfoArr = [];
        resultData.forEach((item) => {
          // ⬇︎ Point(기본 마커)일 경우는 무시
          if (
            item.geometry.type === "Point" ||
            item.geometry.type === "MultiPoint"
          ) {
            return;
          }

          // [수정] lineIndex가 0 이상인 LineString(실제 경로)만 처리
          if (
            item.geometry.type === "LineString" &&
            item.properties.lineIndex !== undefined &&
            item.properties.lineIndex >= 0
          ) {
            const path = item.geometry.coordinates.map((coordinate) => {
              const point = new Tmapv2.Point(coordinate[0], coordinate[1]);
              return Tmapv2.Projection.convertEPSG3857ToWGS84GEO(point);
            });

            // 경로에서 중복 좌표 제거
            path.forEach((latLng, index) => {
              if (
                index === 0 ||
                drawInfoArr.length === 0 || // 초기 배열이 비어있을 경우
                drawInfoArr[drawInfoArr.length - 1]._lat !== latLng._lat ||
                drawInfoArr[drawInfoArr.length - 1]._lng !== latLng._lng
              ) {
                drawInfoArr.push(latLng);
              }
            });
          }
        });

        // 기존 drawInfoArr에서 중복/직선을 추가 제거하는 로직
        const filteredPath = drawInfoArr.filter((point, index, arr) => {
          if (index === 0 || index === arr.length - 1) return true; // 첫 번째/마지막 포인트는 포함

          const prev = arr[index - 1];
          const next = arr[index + 1];

          // 현재 점이 이전 점과 다음 점 사이에 직선상에 위치하는지 확인
          const isRedundant =
            (point._lat === prev._lat && point._lat === next._lat) ||
            (point._lng === prev._lng && point._lng === next._lng);
          return !isRedundant;
        });

        console.log("원본 경로 데이터:", drawInfoArr);
        console.log("필터링된 경로 데이터:", filteredPath);

        const polyline = new Tmapv2.Polyline({
          path: filteredPath, // 필터링된 경로
          strokeColor: "#FF0000",
          strokeWeight: 6,
          map: mapRef.current,
        });
        setPolylines((prev) => [...prev, polyline]);

        //==================================================================

        // 마커 추가 함수
        const addMarker = (lat, lng, title, icon) => {
          const marker = new Tmapv2.Marker({
            position: new Tmapv2.LatLng(lat, lng),
            icon: icon || "", // import한 이미지 파일 사용
            iconSize: new Tmapv2.Size(42, 42), // 원하는 크기로 조정
            iconAnchor: new Tmapv2.Point(32, 0), // 아이콘 기준점 (옵션)
            map: mapRef.current,
            title,
          });
          setMarkers((prev) => [...prev, marker]);
        };

        // 마커 추가
        addMarker(36.80732281, 127.1471658, "출발지", 도착Icon);
        if (station)
          addMarker(
            station.lat,
            station.lng,
            station.name || "경유지",
            경유Icon
          );
        addMarker(
          destination.lat,
          destination.lng,
          destination.name || "도착지",
          도착Icon
        );

        // 소요 시간과 거리 업데이트
        const totalTime = Math.ceil(resultData[0].properties.totalTime / 60);
        const totalDistance = (
          resultData[0].properties.totalDistance / 1000
        ).toFixed(2);
        setInfoPopup({
          time: totalTime,
          distance: totalDistance,
          name: destination.name || "도착지",
        });

        // // 지도 중심 및 줌 조정
        // mapRef.current.setZoom(12);
        // mapRef.current.setCenter(
        //   new Tmapv2.LatLng(
        //     (destination.lat + 36.80732281) / 2,

        //     (destination.lng + 127.1471658) / 2
        //   )
        // );

        // **직접 min/max 계산 → setCenter + setZoom**
        if (filteredPath.length > 0) {
          let minLat = 90,
            maxLat = -90,
            minLng = 180,
            maxLng = -180;

          filteredPath.forEach(({ _lat, _lng }) => {
            if (_lat < minLat) minLat = _lat;
            if (_lat > maxLat) maxLat = _lat;
            if (_lng < minLng) minLng = _lng;
            if (_lng > maxLng) maxLng = _lng;
          });

          // 중심
          const centerLat = (minLat + maxLat) / 2;
          const centerLng = (minLng + maxLng) / 2;
          mapRef.current.setCenter(new Tmapv2.LatLng(centerLat, centerLng));

          // 줌 레벨 계산
          const latDiff = Math.abs(maxLat - minLat);

          const lngDiff = Math.abs(maxLng - minLng);
          const autoZoom = getZoomLevel(latDiff, lngDiff);
          mapRef.current.setZoom(autoZoom - 0.1);
        }
      })
      .catch((error) => {
        console.error("경로 탐색 중 오류 발생:", error.message);
        alert(`경로 탐색 중 오류가 발생했습니다: ${error.message}`);
      });
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

  return (
    <div>
        <div className={`info-popup ${selectedDestination ? "visible" : ""}`}>
        <div class="popup-header">{infoPopup.name}</div>
        <div className="popup-info">소요 시간: {infoPopup.time}분</div>
        <div className="popup-info">남은 거리: {infoPopup.distance}km</div>
        <button class="popup-button" onClick={handleSaveDestination}>목적지 저장</button>
      </div>
    </div>
  );
};
export default RouteSearch;
