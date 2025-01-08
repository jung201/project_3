import React from 'react';
import '../../static/scss/Search/RecommendSTN.scss';
import soil from '../../static/images/stationLogo/soil.PNG';

const RecommendSTN = ({ onClose, onStationSelect }) => {
    const stations = [
        { type: '가격순', name: '만수르 주유소', lat: 37.498175, lng: 127.027926, price: 1500, distance: 5.7, address:'서울시 강남구 역삼동 132'},
        { type: '거리순', name: '빈살만 주유소', lat: 37.497575, lng: 127.026926, price: 1750, distance: 0.5, address:'서울시 강남구 삼성동 122'},
    ];

    return (
        <div className="recommend-popup">
            <div className="recommend-header">
                <h3>잠깐만요! <br></br>아래 주유소에 들르면 어떨까요?</h3>
                <button className="close-btn" onClick={onClose}>
                    ✖
                </button>
            </div>
            <div className="recommend-content">
                {stations.map((station, index) => (
                    <div
                        key={index}
                        className="station-item"
                        onClick={() => onStationSelect(station)}
                    >
                        <div className="station-type">{station.type}</div>
                        <div className="station-info">                        
                            <p><img src={soil}/>　<strong>{station.name}</strong></p>
                            <span>- 가격: {station.price}원</span>
                            <span>　　- 거리: {station.distance}km</span><br/>
                            <span>- 주소: {station.address}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendSTN;
