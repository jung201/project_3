import React, { useEffect, useRef } from "react";

/* global Tmapv2 */
const TMap = ({ mapRef }) => {
  useEffect(() => {
    // TMap 초기화
    if (window.Tmapv2) {
      mapRef.current = new Tmapv2.Map("map_div", {
        center: new Tmapv2.LatLng(36.80732281, 127.1471658),
        width: "100%",
        height: "750px",
        zoom: 17,

      });

      // 초기 위치 마커 추가
      const initialPosition = new Tmapv2.LatLng(36.80732281, 127.1471658); // 초기 마커 좌표
      new Tmapv2.Marker({
        position: initialPosition, // 마커 좌표 설정
        map: mapRef.current,      // 마커를 추가할 지도
        title: "초기 위치",        // 마커 타이틀
      });

      console.log("TMap initialized:", mapRef.current); // mapRef 초기화 확인
    } else {
      console.error("Tmapv2 is not available.");
    }
  }, [mapRef]);

  return <div id="map_div" style={{ height: "700px", marginTop: "10px" }}></div>;
};

export default TMap;
