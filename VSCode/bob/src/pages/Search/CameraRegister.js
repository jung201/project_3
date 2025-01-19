import React, { useEffect, useState, useRef } from "react";
import "../../static/scss/Search/CameraRegister.scss";
import { saveCamera, getAllCameras } from "../../service/apiService";

/* global Tmapv2 */
const CameraRegister = ({ onClose }) => {
  const [markerPosition, setMarkerPosition] = useState(null); // 현재 위치 상태
  const mapRef = useRef(null); // TMap 객체 참조
  const markerRef = useRef(null); // 마커 객체 참조
  const overlayRef = useRef(null); // Overlay 객체 참조

  useEffect(() => {
    const initializeMap = (position) => {
      if (window.Tmapv2) {
        const map = new Tmapv2.Map("map", {
          center: new Tmapv2.LatLng(position.lat, position.lng),
          zoom: 15,
          width: "100%",
          height: "100%",
        });
        mapRef.current = map;

        // 드래그 가능한 마커 생성
        const marker = new Tmapv2.Marker({
          position: new Tmapv2.LatLng(position.lat, position.lng),
          map: map,
          draggable: true,
        });
        markerRef.current = marker;

        const overlayContent = `
          <div class="custom-overlay-cam">
            <div class="overlay-content">
              <p>이 위치에 후방카메라를<br/> 등록하시겠습니까?</p>
              <button class="overlay-save-btn">등록</button>
              <button class="overlay-cancel-btn">취소</button>
            </div>
          </div>`;
        const overlay = new Tmapv2.InfoWindow({
          position: marker.getPosition(),
          content: overlayContent,
          type: 2,
          map: map,
        });
        overlayRef.current = overlay;

        const updateOverlayPosition = () => {
          overlay.setPosition(marker.getPosition());
        };

        marker.addListener("drag", updateOverlayPosition);

        marker.addListener("dragend", () => {
          const newPosition = marker.getPosition();
          setMarkerPosition({
            lat: newPosition._lat,
            lng: newPosition._lng,
          });
          updateOverlayPosition();
        });

        setTimeout(() => {
          const saveBtn = document.querySelector(".overlay-save-btn");
          const cancelBtn = document.querySelector(".overlay-cancel-btn");

          saveBtn.onclick = async () => {
            const finalPosition = markerRef.current.getPosition();
            try {
              console.log(
                "저장 요청 중: 위도 =",
                finalPosition._lat,
                ", 경도 =",
                finalPosition._lng
              );
              // 카메라 데이터 저장
              await saveCamera(finalPosition._lat, finalPosition._lng);

              // 새 마커를 지도에 추가
              new Tmapv2.Marker({
                position: new Tmapv2.LatLng(
                  finalPosition._lat,
                  finalPosition._lng
                ),
                map: mapRef.current,
                title: "등록된 카메라",
              });

              alert(
                `후방카메라가 등록되었습니다: \n위도: ${finalPosition._lat}, 경도: ${finalPosition._lng}`
              );
              onClose();
            } catch (error) {
              console.error(
                "카메라 저장 오류:",
                error.response ? error.response.data : error.message
              );
              alert("카메라 저장 중 문제가 발생했습니다.");
            }
          };

          cancelBtn.onclick = () => {
            onClose();
          };
        }, 0);
      } else {
        console.error("Tmapv2 is not available.");
      }
    };

    //====================================================================

    // 저장된 카메라 DB 불러오기
    const loadSavedCameras = async (map) => {
      try {
        const cameras = await getAllCameras(); // DB에서 카메라 데이터를 가져옴
        console.log("API에서 반환된 카메라 데이터:", cameras); // API 응답 확인

        if (cameras && cameras.length > 0) {
          cameras.forEach((camera) => {
            // 좌표 데이터 유효성 검사
            if (camera.camLatitude && camera.camLongitude) {

              const latitude = parseFloat(camera.camLatitude); // 문자열을 숫자로 변환
              const longitude = parseFloat(camera.camLongitude);
    
              if (!isNaN(latitude) && !isNaN(longitude)) {
                console.log("Adding marker for camera:", camera);
    
                // 마커 추가
                new Tmapv2.Marker({
                  position: new Tmapv2.LatLng(latitude, longitude),
                  map: map,
                  title: `등록된 카메라: ${camera.camId}`,
                });

              } else {
                console.warn("유효하지 않은 좌표 데이터:", camera);
              }
            } else {
              console.warn("카메라 데이터 누락:", camera);
            }
          });
        } else {
          console.warn("DB에서 카메라 데이터가 비어있습니다.");
        }
      } catch (error) {
        console.error("Camera 데이터 로드 실패:", error);
      }
    };
    
    //====================================================================

    // 기본 좌표 설정
    const defaultPosition = { lat: 36.80732281, lng: 127.1471658 };
    setMarkerPosition(defaultPosition);
    const map = initializeMap(defaultPosition); // 지도 초기화
    loadSavedCameras(map); // 저장된 카메라 불러오기

    return () => {
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
    };
  }, [onClose]);

  return (
    <div className="camera-register">
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
};

export default CameraRegister;
