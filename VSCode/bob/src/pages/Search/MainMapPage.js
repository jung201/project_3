import React, { useState, useRef } from "react";
import TMap from "./TMap";
import SearchDest from "./SearchDest";
import RouteSearch from "./RouteSearch";
import RecommendSTN from "./RecommendSTN";
import "../../static/scss/Search/MainMapPage.scss";

const MainMapPage = () => {
  const [selectedDestination, setSelectedDestination] = useState(null); // 선택된 도착지 상태
  const [activePopup, setActivePopup] = useState("search"); // 팝업 상태
  const [showRecommendPopup, setShowRecommendPopup] = useState(false); // 경유지 추천 팝업 상태
  const mapRef = useRef(null); // TMap 객체를 참조할 Ref

  const togglePopup = () => {
    setActivePopup((prev) => (prev === "search" ? null : "search"));
  };

  const handleStationSelect = (station) => {
    console.log("선택한 주유소:", station);
    // 선택된 주유소에 대한 로직 추가 가능
    setShowRecommendPopup(false); // 팝업 닫기
  };

  return (
    <div className="main-map-page">

      {/* 지도 화면 */}
      <div className="map-container">
        <TMap mapRef={mapRef} />
      </div>

      {/* 경로 탐색 */}
      <RouteSearch
        mapRef={mapRef}
        selectedDestination={selectedDestination}
      />

      {/* SearchDest 팝업 */}
      {activePopup === "search" && (
        <div className="search-overlay">
          <SearchDest
            onClose={togglePopup} // 팝업 닫기
            onDestinationSelect={(destination) => {
              setSelectedDestination(destination);
              setShowRecommendPopup(true); // 검색 후 추천 팝업 띄우기
            }}
            mapRef={mapRef} // 지도 객체 전달
          />
        </div>
      )}

      {/* RecommendSTN 팝업 */}
      {showRecommendPopup && (
        <RecommendSTN
          onClose={() => setShowRecommendPopup(false)} // 팝업 닫기
          onStationSelect={handleStationSelect} // 주유소 선택
        />
      )}

      {/* 우측 하단 아이콘 */}
      <div className="floating-icons">
        <button className="icon-btn" onClick={togglePopup}>
          🔍
        </button>
      </div>
    </div>
  );
};

export default MainMapPage;
