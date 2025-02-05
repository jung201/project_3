/*
 * PROJECT       : 주유소/전기차 충전소 정보 제공 및 현재 위치 기준 목적지 추천시스템
 * PROGRAM ID    : SearchDest.js
 * PROGRAM NAME  : 목적지 검색 및 선택을 담당하는 React 컴포넌트
 * DESCRIPTION   : 
 *                 - Tmap API를 이용하여 사용자가 목적지를 검색할 수 있도록 지원
 *                 - 검색된 장소 목록을 지도에 마커로 표시
 *                 - 사용자가 선택한 목적지를 지도 중심으로 이동 및 마커 추가
 *                 - 선택한 목적지를 부모 컴포넌트(RouteSearch)로 전달하여 경로 탐색에 반영
 *                 - 목적지 선택 시 URL을 업데이트하여 다른 페이지에서 해당 위치를 활용할 수 있도록 지원
 * AUTHOR        : 이정규
 * CREATED DATE  : 2025.02.05
 * HISTORY
 * =====================================================
 * DATE          NAME      DESCRIPTION
 * -----------------------------------------------------
 * 2025.02.05    이정규     초기 버전 작성
 */

import React, { useState, useRef, useEffect } from "react";
import { getAllCameras } from "../../service/apiService"; // 카메라 데이터 API
import 도착Icon from "../../static/images/icons/도착.png";

/* global Tmapv2 */
const SearchDest = ({ onClose, onDestinationSelect, mapRef }) => {
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색 키워드 상태
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태
  const markerRefs = useRef([]); // 마커 관리용 Ref
  const appKey = "ykiQ5w0ftD9OWcnVnthjn3a7wr6HsgNW8rkLYp8t"; // TMap API Key

  // 기존 마커 초기화
  const clearMarkers = () => {
    markerRefs.current.forEach((marker) => marker.setMap(null));
    markerRefs.current = [];
  };

  // 장소 검색
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://apis.openapi.sk.com/tmap/pois?version=1&format=json&searchKeyword=${searchKeyword}&resCoordType=WGS84GEO&reqCoordType=WGS84GEO&count=10`,
        { headers: { appKey } }
      );

      if (!response.ok) {
        console.error("TMap API 요청 실패:", response.status);
        return;
      }

      const data = await response.json();
      const pois = data.searchPoiInfo.pois.poi || [];
      setSearchResults(pois);

      if (mapRef.current) {
        clearMarkers(); // 기존 마커 제거
        pois.forEach((poi) => addMarkerToMap(poi)); // 새로운 마커 추가
      }
    } catch (error) {
      console.error("장소 검색 오류:", error);
    }
  };

  // 지도에 마커 추가
  const addMarkerToMap = (poi) => {
    const { noorLat, noorLon, name } = poi;

    if (!mapRef.current) {
      console.error("TMap 객체 초기화되지 않음");
      return;
    }

    const point = new Tmapv2.Point(Number(noorLon), Number(noorLat));
    const convertedPoint = Tmapv2.Projection.convertEPSG3857ToWGS84GEO(point);

    try {
      const marker = new Tmapv2.Marker({
        position: new Tmapv2.LatLng(convertedPoint._lat, convertedPoint._lng),
        map: mapRef.current,
        title: name || "Unknown Location",
      });
      markerRefs.current.push(marker); // 마커 배열에 추가
    } catch (error) {
      console.error("마커 추가 오류:", error);
    }
  };

  // URL 업데이트 함수 추가 (새로운 코드)
  const updateURLWithDestination = (location) => {
    const { lat, lng, name } = location;
    const newUrl = `/MainMapPage?lat=${lat}&lng=${lng}&name=${encodeURIComponent(name)}`;
    window.location.href = newUrl; // URL 이동
  };

  // 목적지 선택
  const handleDestinationSelect = (location) => {
    if (!mapRef.current) {
      console.error("TMap 객체 초기화되지 않음");
      return;
    }

    mapRef.current.setCenter(new Tmapv2.LatLng(location.lat, location.lng));
    mapRef.current.setZoom(18); // 줌 레벨 조정

    const marker = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(location.lat, location.lng),
      map: mapRef.current,
      title: location.name,
      icon: 도착Icon,
      iconSize: new Tmapv2.Size(42, 42), // 마커 크기 조정
    });
    markerRefs.current.push(marker);

    // URL 업데이트 호출
    updateURLWithDestination(location);

    onDestinationSelect(location); // 선택된 위치 전달
    onClose(); // 팝업 닫기
  };

  // Enter 키 감지
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
  }, []);

  return (
    <div className="search-dest">
      <button className="close-btn" onClick={onClose}>
        ✖
      </button>
      <h3>어디를 가시나요?</h3>
      <div>
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="장소를 검색하세요"
        />
        <button className="searchBtn" onClick={handleSearch}>
          검색
        </button>
      </div>
      <div>
        {searchResults.map((result, index) => (
          <div
            key={index}
            onClick={() =>
              handleDestinationSelect({
                name: result.name,
                lat: Number(result.noorLat),
                lng: Number(result.noorLon),
              })
            }
            style={{ cursor: "pointer", margin: "10px 0" }}
          >
            <strong>{result.name}</strong>
            <div>
              {result.upperAddrName} {result.middleAddrName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchDest;
