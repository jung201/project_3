import React from "react";
import "../../static/scss/Search/RecommendSTN.scss";
import soil from "../../static/images/stationLogo/soil.PNG";

const RecommendSTN = ({ onClose, onStationSelect, stations }) => {
  console.log("RecommendSTN에 전달된 stations:", stations);
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
          stations.map((station, index) => (
            <div
              key={index}
              className="station-item"
              onClick={() => onStationSelect(station)}
            >
              <div className="station-type">{station.type || "S-OIL"}</div>
              <div className="station-info">
                <p>
                  <img src={soil} alt="주유소 로고" />{" "}
                  <strong>{station.name}</strong>
                </p>
                <span>- 가격: {station.price}원</span>
                <span> - 거리: {station.distance}km</span>
                <br />
                <span>- 주소: {station.address || "주소 정보 없음"}</span>
              </div>
            </div>
          ))
        ) : (
          <p>주유소 정보를 불러오는 중입니다...</p>
        )}
      </div>
    </div>
  );
};

export default RecommendSTN;
