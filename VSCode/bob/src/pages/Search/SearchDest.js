import React, { useState, useRef } from "react";

/* global Tmapv2 */
const SearchDest = ({ onClose, onDestinationSelect, mapRef }) => {
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색 키워드 상태
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태
  const appKey = "ykiQ5w0ftD9OWcnVnthjn3a7wr6HsgNW8rkLYp8t"; // TMap API Key
  const markerRefs = useRef([]); // 마커 관리용 Ref

  const clearMarkers = () => {
    // 기존 마커 초기화
    markerRefs.current.forEach((marker) => marker.setMap(null));
    markerRefs.current = [];
  };

  // 장소 검색 함수
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://apis.openapi.sk.com/tmap/pois?version=1&format=json&searchKeyword=${searchKeyword}&resCoordType=WGS84GEO&reqCoordType=WGS84GEO&count=10`,
        {
          headers: { appKey },
        }
      );
  
      if (!response.ok) {
        console.error("Failed to fetch data from TMap API:", response.status);
        return;
      }
  
      const data = await response.json();
      const pois = data.searchPoiInfo.pois.poi || [];
      console.log("POI Data:", pois); // 반환된 좌표 데이터 확인
  
      setSearchResults(pois);
  
      if (mapRef.current) {
        clearMarkers();
        pois.forEach((poi) => addMarkerToMap(poi));
      }
    } catch (error) {
      console.error("Error fetching POIs:", error);
    }
  };
  

  // 지도에 마커를 추가하는 함수
  const addMarkerToMap = (poi) => {
    const { noorLat, noorLon, name } = poi;
    console.log("Original POI:", poi); // 원본 좌표 확인

    const point = new Tmapv2.Point(Number(noorLon), Number(noorLat));
    const convertedPoint = Tmapv2.Projection.convertEPSG3857ToWGS84GEO(point);
    console.log("Converted Point:", convertedPoint); // 변환된 좌표 확인

    // 마커 생성
    const marker = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(convertedPoint._lat, convertedPoint._lng),
      map: mapRef.current,
      title: name,
    });

    markerRefs.current.push(marker);
  };

  const handleDestinationSelect = (location) => {
    console.log("mapRef.current before setCenter:", mapRef.current); // 현재 mapRef 상태 확인
    console.log("Selected Location:", location); // 이동하려는 좌표 확인

    if (!mapRef.current) {
      console.error("mapRef is not initialized.");
      return;
    }

    // // 지도 강제 리프레시 (TMap에 invalidateSize는 없지만 재검토를 위해 리프레시 가능)
    // if (mapRef.current.invalidateSize) {
    //   mapRef.current.invalidateSize();
    //   console.log("Map invalidated.");
    // }

    // 지도 중심 이동 및 줌 조정
    mapRef.current.setCenter(new Tmapv2.LatLng(location.lat, location.lng));
    mapRef.current.setZoom(18); // 줌 레벨을 변경하여 지도 상태를 강제로 업데이트
    console.log(
      "setCenter called with:",
      location.lat,
      location.lng
    );

    // 장소 선택 시 지도 중심 이동 및 마커 추가
    const marker = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(location.lat, location.lng),
      map: mapRef.current,
      title: location.name,
    });

    mapRef.current.setCenter(new Tmapv2.LatLng(location.lat, location.lng)); // 지도 중심 이동
    console.log("setCenter called with:", location.lat, location.lng);
    markerRefs.current.push(marker); // 마커 추가
    onClose(); // 팝업 닫기
  };

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
