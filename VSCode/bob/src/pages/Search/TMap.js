import React, { useEffect } from "react";
import 도착Icon from "../../static/images/icons/도착.png";

/* global Tmapv2 */
const TMap = ({ mapRef, savedMarkers }) => {
  useEffect(() => {
    // 지도 초기화
    const initializeMap = (latitude, longitude) => {
      if (window.Tmapv2) {
        // 지도 생성
        mapRef.current = new Tmapv2.Map("map_div", {
          center: new Tmapv2.LatLng(latitude, longitude),
          width: "100%",
          height: "750px",
          zoom: 15, // 줌 레벨
        });

        console.log(
          `Map initialized at: Latitude ${latitude}, Longitude ${longitude}`
        );

        // 초기 위치에 마커 추가
        new Tmapv2.Marker({
          position: new Tmapv2.LatLng(latitude, longitude),
          map: mapRef.current,
          title: "초기 위치",
          icon: 도착Icon,
          iconSize: new Tmapv2.Size(42, 42),
          iconAnchor: new Tmapv2.Point(21, 42),
        });
      } else {
        console.error("Tmapv2 is not available.");
      }
    };

    // 저장된 마커를 지도에 추가
    const addSavedMarkers = () => {
      if (savedMarkers && savedMarkers.length > 0 && mapRef.current) {
        savedMarkers.forEach((markerData) => {
          const { camLatitude, camLongitude, camId } = markerData;
          const latitude = parseFloat(camLatitude);
          const longitude = parseFloat(camLongitude);

          if (!isNaN(latitude) && !isNaN(longitude)) {
            new Tmapv2.Marker({
              position: new Tmapv2.LatLng(latitude, longitude),
              map: mapRef.current,
              title: `등록된 카메라: ${camId}`,
              icon: 도착Icon,
              iconSize: new Tmapv2.Size(32, 32),
            });
            console.log(`Added marker for camera ID: ${camId}`);
          } else {
            console.warn("Invalid coordinates for marker:", markerData);
          }
        });
      }
    };

    // 기본 좌표로 지도 초기화
    const defaultLat = 36.80732281;
    const defaultLng = 127.1471658;
    initializeMap(defaultLat, defaultLng);

    // 저장된 마커 추가
    addSavedMarkers();
  }, [mapRef, savedMarkers]);

  return (
    <div id="map_div" style={{ height: "700px", marginTop: "10px" }}></div>
  );
};

export default TMap;
