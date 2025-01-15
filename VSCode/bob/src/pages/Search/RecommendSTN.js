import React from "react";
import "../../static/scss/Search/RecommendSTN.scss";
import soil from "../../static/images/stationLogo/soil.PNG";

const RecommendSTN = ({ onClose, onStationSelect, stations }) => {
  return (
    <div className="recommend-popup">
      <div className="recommend-header">
        <h3>
          잠깐만요! <br></br>아래 주유소에 들르면 어떨까요?
        </h3>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
      </div>
      <div className="recommend-content">
        {stations.map((station, index) => (
          <div
            key={index}
            className="station-item"
            onClick={() => onStationSelect(station)} // 주유소 선택 시 부모로 전달
          >
            <div className="station-type">{station.type}</div>
            <div className="station-info">
              <p>
                <img src={soil} />　<strong>{station.name}</strong>
              </p>
              <span>- 가격: {station.price}원</span>
              <span>　　- 거리: {station.distance}km</span>
              <br />
              <span>- 주소: {station.address}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendSTN;
