import React, { useEffect } from "react";

/* global Tmapv2 */
const TMap = ({ mapRef, selectedDestination }) => {

  useEffect(() => {
    // 지도 초기화
    if (!mapRef.current && window.Tmapv2) {
      mapRef.current = new Tmapv2.Map("map_div", {
        center: new Tmapv2.LatLng(36.80732281, 127.1471658),
        width: "100%",
        height: "750px",
        zoom: 17,
      });

      // 초기 위치 마커
      const initialPosition = new Tmapv2.LatLng(36.80732281, 127.1471658);
      new Tmapv2.Marker({
        position: initialPosition,
        map: mapRef.current,
        title: "초기 위치(휴먼교육센터)",
      });

      console.log("TMap initialized:", mapRef.current);
    }

    // 선택된 도착지가 변경되면 지도 중심 이동
    if (selectedDestination && mapRef.current) {
      const { lat, lng, name } = selectedDestination;

      mapRef.current.setCenter(new Tmapv2.LatLng(lat, lng));
      mapRef.current.setZoom(18);

      new Tmapv2.Marker({
        position: new Tmapv2.LatLng(lat, lng),
        map: mapRef.current,
        title: name,
      });

      console.log("Destination selected:", name, lat, lng);
    }
  }, [mapRef, selectedDestination]);

  return <div id="map_div" style={{ height: "700px", marginTop: "10px" }}></div>;
};

export default TMap;
