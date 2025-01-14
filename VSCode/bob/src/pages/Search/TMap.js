import React, { useEffect } from "react";

/* global Tmapv2 */
const TMap = ({ mapRef }) => {
  useEffect(() => {
    // TMap 초기화
    if (window.Tmapv2) {
      mapRef.current = new Tmapv2.Map("map_div", {
        center: new Tmapv2.LatLng(37.566567545861645, 126.9850380932383),
        width: "100%",
        height: "750px",
        zoom: 11,
      });
      console.log("TMap initialized:", mapRef.current); // mapRef 초기화 확인
    } else {
      console.error("Tmapv2 is not available.");
    }
  }, [mapRef]);

  return <div id="map_div" style={{ height: "700px", marginTop: "10px" }}></div>;
};

export default TMap;
