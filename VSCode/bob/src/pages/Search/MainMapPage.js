import React, { useState, useRef } from "react";
import TMap from "./TMap";
import SearchDest from "./SearchDest";
import "../../static/scss/Search/MainMapPage.scss";

const MainMapPage = () => {
  const [activePopup, setActivePopup] = useState("search"); // 팝업 상태
  const mapRef = useRef(null); // TMap 객체를 참조할 Ref

  const togglePopup = () => {
    setActivePopup((prev) => (prev === "search" ? null : "search"));
  };

  return (
    <div className="main-map-page">
      {/* 지도 화면 */}
      <div className="map-container">
        <TMap mapRef={mapRef} />
      </div>

      {/* SearchDest 팝업 */}
      {activePopup === "search" && (
        <div className="search-overlay">
          <SearchDest
            onClose={togglePopup} // 팝업 닫기
            mapRef={mapRef} // 지도 객체 전달
          />
        </div>
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
