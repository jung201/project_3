import React, { useState, useRef } from "react";
import TMap from "./TMap";
import SearchDest from "./SearchDest";
import RouteSearch from "./RouteSearch";
import RecommendSTN from "./RecommendSTN";
import "../../static/scss/Search/MainMapPage.scss";
import CameraRegister from "./CameraRegister"; // 새로운 컴포넌트

const MainMapPage = () => {
  const [selectedDestination, setSelectedDestination] = useState(null); // 선택된 도착지 상태
  const [activePopup, setActivePopup] = useState("search"); // 팝업 상태
  const [showRecommendPopup, setShowRecommendPopup] = useState(false); // 경유지 추천 팝업 상태
  const [selectedStation, setSelectedStation] = useState(null); // 선택된 주유소 상태
  const [stations, setStations] = useState([]); // 주유소 목록
  const mapRef = useRef(null); // TMap 객체를 참조할 Ref

  // 주유소 선택 핸들러
  const handleStationSelect = (station) => {
    setSelectedStation(station); // 선택된 주유소 업데이트
    setShowRecommendPopup(false); // 팝업 닫기
  };

  // 목적지 선택 핸들러
  const handleDestinationSelect = (destination, stationData) => {
    setSelectedDestination(destination); // 선택된 목적지 업데이트
    setStations(stationData || []); // 주유소 목록 업데이트
    setShowRecommendPopup(true); // 주유소 추천 팝업 표시
    console.log("선택된 목적지:", destination);
    console.log("받아온 주유소 데이터:", stationData);
  };

  const togglePopup = (popup) => {
    setActivePopup((prev) => (prev === popup ? null : popup)); // 선택된 팝업 활성화
  };

  return (
    <div className="main-map-page">
      {/* 지도 화면 - activePopup이 'camera'일 때 숨기기 */}
      {activePopup !== "camera" && (
        <div className="map-container">
          <TMap mapRef={mapRef} />
        </div>
      )}

      {/* 경로 탐색 - activePopup이 'camera'일 때 숨기기 */}
      {activePopup !== "camera" && (
        <RouteSearch
          mapRef={mapRef}
          selectedDestination={selectedDestination}
          selectedStation={selectedStation} // 선택된 주유소 전달
          onStationsUpdate={(filteredStations) => {
            setStations(filteredStations); // 필터링된 주유소 업데이트
            setShowRecommendPopup(true); // 팝업 표시
          }}
          showRecommendPopup={showRecommendPopup}
        />
      )}

      {/* SearchDest 팝업 */}
      {activePopup === "search" && (
        <div className="search-overlay">
          <SearchDest
            onClose={() => togglePopup("search")} // 팝업 닫기
            onDestinationSelect={(destination, stationData) =>
              handleDestinationSelect(destination, stationData)
            }
            mapRef={mapRef} // 지도 객체 전달
          />
        </div>
      )}

      {/* RecommendSTN 팝업 */}
      {showRecommendPopup && activePopup !== "camera" && (
        <RecommendSTN
          onClose={() => setShowRecommendPopup(false)} // 팝업 닫기
          stations={stations} // 주유소 데이터 전달
          onStationSelect={handleStationSelect} // 주유소 선택 핸들러
        />
      )}

      {/* CameraRegister 화면 */}
      {activePopup === "camera" && (
        <CameraRegister onClose={() => togglePopup("camera")} />
      )}

      {/* 우측 하단 아이콘 */}
      <div className="floating-icons">
        <button
          className="icon-btn"
          onClick={() => togglePopup("search")} // 'search' 팝업 활성화
        >
          🔍
        </button>
        <button
          className={`icon-btn ${activePopup === "camera" ? "active" : ""}`}
          onClick={() => togglePopup("camera")} // 'camera' 팝업 활성화
        >
          📷
        </button>
      </div>
    </div>
  );
};

export default MainMapPage;
