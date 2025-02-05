/*
 * PROJECT       : 주유소/전기차 충전소 정보 제공 및 현재 위치 기준 목적지 추천시스템
 * PROGRAM ID    : RecommendSTN.js
 * PROGRAM NAME  : 추천 주유소 안내 팝업 컴포넌트
 * DESCRIPTION   : 
 *                 - 경로 탐색 시, 사용자에게 추천 주유소(최단거리 및 최저가)를 안내하는 팝업 UI 제공
 *                 - 주유소 데이터를 분석하여 최단거리 주유소와 최저가 주유소를 자동으로 선택
 *                 - 선택한 주유소를 부모 컴포넌트(RouteSearch)로 전달하여 경로 탐색에 반영
 *                 - 주유소 정보를 클릭하면 경유지로 설정됨
 * AUTHOR        : 이정규
 * CREATED DATE  : 2025.02.05
 * HISTORY
 * =====================================================
 * DATE          NAME      DESCRIPTION
 * -----------------------------------------------------
 * 2025.02.05    이정규     초기 버전 작성
 */

import React from "react";
import "../../static/scss/Search/RecommendSTN.scss";
import soil from "../../static/images/stationLogo/soil.PNG";

const RecommendSTN = ({ onClose, onStationSelect, stations }) => {
  console.log("stations 배열:", stations);

  // 주유소 선택 
  const handleStationSelect = (station) => {
    if (!station || !station.latitude || !station.longitude) {
      console.error("유효하지 않은 주유소 데이터:", station);
      alert("주유소 데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.");
      return;
    }
    // 데이터 로깅: 선택된 주유소의 데이터 확인
    console.log("선택한 주유소:", station);

    // 주유소 데이터 전달
    onStationSelect({
      name: station.name,
      lat: parseFloat(station.latitude), // 위도를 숫자로 변환
      lng: parseFloat(station.longitude), // 경도를 숫자로 변환
      price: station.price,
      distance: station.distance,
    });
    onClose(); // 팝업 닫기
  };

  // 최저가 주유소와 최단거리 주유소 찾기
  const cheapestStation =
    stations.length > 0
      ? stations.reduce((prev, curr) =>
        parseFloat(prev.price) < parseFloat(curr.price) ? prev : curr
      )
      : null;

  const closestStation =
    stations.length > 0
      ? stations.reduce((prev, curr) =>
        parseFloat(prev.distance) < parseFloat(curr.distance) ? prev : curr
      )
      : null;

  return (
    <div className="recommend-popup">
      <div className="recommend-header">
        <h3>
          잠깐만요 ! <br /> 아래 주유소에 들르면 어떨까요?
        </h3>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
      </div>
      <div className="recommend-content">
        {stations.length > 0 ? (
          <>
            {/* 최단거리 주유소 */}
            {closestStation && (
              <div
                className="station-item"
                onClick={() => handleStationSelect(closestStation)}
              >
                <div className="station-type">최단거리 주유소</div>
                <div className="station-info">
                  <p>
                    <img src={soil} alt="주유소 로고" />{" "}
                    <strong>{closestStation.name}</strong>
                  </p>
                  <span>- 가격: {closestStation.price}원</span>
                  <span> - 거리: {closestStation.distance}km</span>
                  <br />
                </div>
              </div>
            )}

            {/* 최저가 주유소 */}
            {cheapestStation && (
              <div
                className="station-item"
                onClick={() => handleStationSelect(cheapestStation)}
              >
                <div className="station-type">최저가 주유소</div>
                <div className="station-info">
                  <p>
                    <img src={soil} alt="주유소 로고" />{" "}
                    <strong>{cheapestStation.name}</strong>
                  </p>
                  <span>- 가격: {cheapestStation.price}원</span>
                  <span> - 거리: {cheapestStation.distance}km</span>
                  <br />
                </div>
              </div>
            )}
          </>
        ) : (
          <p>주유소 정보를 불러오는 중입니다...</p>
        )}
      </div>
    </div>
  );
};

export default RecommendSTN;
