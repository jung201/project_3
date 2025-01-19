import React, { useEffect } from "react";
import 도착Icon from "../../static/images/icons/도착.png";

/* global Tmapv2 */
const TMap = ({ mapRef }) => {
  useEffect(() => {
    // 현재 위치 요청 및 지도 초기화
    const initializeMap = (latitude, longitude) => {
      if (window.Tmapv2) {

        // 지도 생성
        mapRef.current = new Tmapv2.Map("map_div", {
          center: new Tmapv2.LatLng(latitude, longitude), // 현재 위치로 설정
          width: "100%",
          height: "750px",
          title: "휴먼교육센터",
          zoom: 15, // 줌 레벨
        });
        console.log(
          `Map initialized at: Latitude ${latitude}, Longitude ${longitude}`
        );

        // 초기 위치에 마커 추가
        const marker = new Tmapv2.Marker({
          position: new Tmapv2.LatLng(36.80732281, 127.1471658),
          map: mapRef.current,
          title: "초기 위치 (휴먼교육센터)",
          icon: 도착Icon, // <-- 커스텀 아이콘
          iconSize: new Tmapv2.Size(42, 42),
          iconAnchor: new Tmapv2.Point(21, 42), 
        });
        
      } else {
        console.error("Tmapv2 is not available.");
      }
    };

    // 기본 좌표로 지도 초기화
    const defaultLat = 36.80732281; // 기본 위도
    const defaultLng = 127.1471658; // 기본 경도
    initializeMap(defaultLat, defaultLng);

  }, [mapRef]);

  return (
    <div id="map_div" style={{ height: "700px", marginTop: "10px" }}></div>
  );
};

export default TMap;
