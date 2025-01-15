import React, { useEffect } from "react";

/* global Tmapv2 */
const TMap = ({ mapRef }) => {
  useEffect(() => {
    // 사용자 위치 가져오기
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("User Location:", latitude, longitude);

        // TMap 초기화
        if (window.Tmapv2) {
          mapRef.current = new Tmapv2.Map("map_div", {
            center: new Tmapv2.LatLng(latitude, longitude), // 사용자 위치로 설정
            width: "100%",
            height: "750px",
            zoom: 15, // 줌 레벨
          });
        } else {
          console.error("Tmapv2 is not available.");
        }
      },
      (error) => {
        console.error("Error getting user location:", error);

        // 위치 가져오기 실패 시 기본 위치 설정
        if (window.Tmapv2) {
          mapRef.current = new Tmapv2.Map("map_div", {
            center: new Tmapv2.LatLng(37.566567545861645, 126.9850380932383), // 서울 중심 좌표
            width: "100%",
            height: "750px",
            zoom: 11,
          });
        }
      }
    );
  }, [mapRef]);

  return <div id="map_div" style={{ height: "700px", marginTop: "10px" }}></div>;
};

export default TMap;
