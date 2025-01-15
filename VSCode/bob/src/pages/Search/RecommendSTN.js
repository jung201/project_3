import React from "react";
import "../../static/scss/Search/RecommendSTN.scss";
import soil from "../../static/images/stationLogo/soil.PNG";

const RecommendSTN = ({ onClose, onStationSelect, stations }) => {
  console.log("RecommendSTN에 전달된 stations:", stations);

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
          잠깐만요! <br /> 아래 주유소에 들르면 어떨까요?
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
                onClick={() => onStationSelect(closestStation)}
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
                  <span>
                    - 주소: {closestStation.address || "주소 정보 없음"}
                  </span>
                </div>
              </div>
            )}
            {/* 최저가 주유소 */}
            {cheapestStation && (
              <div
                className="station-item"
                onClick={() => onStationSelect(cheapestStation)}
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
                  <span>
                    - 주소: {cheapestStation.address || "주소 정보 없음"}
                  </span>
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
