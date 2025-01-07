import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa'; // React Icons 사용
import "../../static/scss/Info/Maps.scss";
import "../../static/scss/Info/Popup.scss";
import red from "../../static/images/icons/red.png";
import yellow from '../../static/images/icons/yellow.png';
import green from '../../static/images/icons/green.png';
import soil from '../../static/images/stationLogo/soil.PNG';
import store from '../../static/images/icons/store.PNG';
import repair from '../../static/images/icons/repair.PNG';
import good from '../../static/images/icons/good.PNG';
import review from '../../static/images/icons/review.PNG';


const Maps = () => {
    const [selectedStation, setSelectedStation] = useState(null); // 세부 팝업에 표시할 데이터
    const [isDetailPopupVisible, setDetailPopupVisible] = useState(false); // 세부 팝업 표시 여부
    const [isRatingPopupVisible, setRatingPopupVisible] = useState(false); // 평점등록 팝업 표시 여부
    const [isFavorite, setIsFavorite] = useState(false); // 관심장소 등록 여부
    const [rating, setRating] = useState({ restroom: 0, access: 0, price: 0 }); // 평점 등록 값

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=8d4462d3e1aeb898f4a7fde7440dec38&autoload=false`;
        script.async = true;

        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById('map');
                const options = {
                    center: new window.kakao.maps.LatLng(37.4979, 127.0276),
                    level: 4,
                };
                const map = new window.kakao.maps.Map(container, options);

                const markerData = [
                    {
                        id: 1,
                        position: new window.kakao.maps.LatLng(37.4999, 127.0286),
                        color: 'green',
                        name: '만수르 주유소',
                        price: 1450,
                        address: '천안시 서북구 광장로 231',
                        phone: '041-123-1445',
                        rating: 4.52,
                        restroomRating: 4.2, // 기본값 추가
                        accessRating: 4.0,
                        priceRating: 4.5,
                        update: '2024-05-25 11:30',
                        minus: "-30",
                        good: "Y",
                        repair:"Y",
                        convenienceStore: "Y",
                    },
                    {
                        id: 2,
                        position: new window.kakao.maps.LatLng(37.4965, 127.0250),
                        color: 'red',
                        name: '행운 주유소',
                        price: 1560,
                        address: '천안시 동남구 유관순로 211',
                        phone: '041-144-1547',
                        rating: 3.45,
                        restroomRating: 3.8,
                        accessRating: 3.6,
                        priceRating: 3.9,
                        update: '2024-05-25 11:30',
                        minus: "+127",
                        good: "Y",
                        repair:"Y",
                        convenienceStore: "N",
                    },
                    {
                        id: 3,
                        position: new window.kakao.maps.LatLng(37.4995, 127.0300),
                        color: 'yellow',
                        name: '행복 주유소',
                        price: 1500,
                        address: '천안시 서북구 충무로 171',
                        phone: '041-123-0157',
                        rating: 4.23,
                        restroomRating: 4.0,
                        accessRating: 4.1,
                        priceRating: 4.2,
                        update: '2024-05-25 11:30',
                        minus: "-5",
                        good: "N",
                        repair:"Y",
                        convenienceStore: "Y",
                    },
                ];

                const markerImages = {
                    red: red,
                    yellow: yellow,
                    green: green,
                };

                const infoWindow = new window.kakao.maps.InfoWindow();

                markerData.forEach((data) => {
                    const marker = new window.kakao.maps.Marker({
                        position: data.position,
                        image: new window.kakao.maps.MarkerImage(
                            markerImages[data.color],
                            new window.kakao.maps.Size(35, 35)
                        ),
                    });
                    marker.setMap(map);

                    window.kakao.maps.event.addListener(marker, 'click', () => {
                        infoWindow.setContent(`
                            <div class="info-popup">
                                <button id="closePopup" class="close-btn" style="position: absolute; top: 5px; right: 5px;">✖</button>
                                <img src=${soil} alt="logo" /> <strong>${data.name}</strong><br/>
                                <span>- 가격 : ${data.price}원</span>
                                <span class="${parseInt(data.minus) < 0 ? 'math blue' : 'math red'}">[전국평균대비 ${data.minus}원]</span><br/>
                                <span>- 평점 : ${data.rating}점</span><br/>
                                <button id="detailView">세부정보보기</button>
                            </div>
                        `);
                    
                        infoWindow.open(map, marker);
                    
                        setTimeout(() => {
                            const closeBtn = document.getElementById('closePopup');
                            if (closeBtn) {
                                closeBtn.addEventListener('click', () => {
                                    infoWindow.close();
                                });
                            }
                    
                            const detailBtn = document.getElementById('detailView');
                            if (detailBtn) {
                                detailBtn.addEventListener('click', () => {
                                    setSelectedStation(data);
                                    setDetailPopupVisible(true);
                                });
                            }
                        }, 0);
                    });
                });
            });
        };

        document.head.appendChild(script);
    }, []);


    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
    };

    const handleStarClick = (category, value) => {
        setRating((prev) => ({ ...prev, [category]: value }));
    };

const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => {
        const percentage = Math.min(Math.max(rating - index, 0), 1) * 100; // 별 채우기 비율 계산 (0% ~ 100%)
        return (
            <div
                key={index}
                style={{
                    position: "relative",
                    display: "inline-block",
                    width: "20px", // 별 크기
                    height: "20px",
                    color: "#e4e5e9", // 기본 별 색상
                }}
            >
                <FaStar
                    style={{
                        position: "absolute",
                        top: "6px",
                        left: 0,
                        zIndex: 1,
                    }}
                />
                <FaStar
                    style={{
                        position: "absolute",
                        top: '6px',
                        left: 0,
                        zIndex: 2,
                        color: "#ffc107", // 채운 별 색상
                        clipPath: `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0% 100%)`, // 소수점에 따라 채우기 비율 설정
                    }}
                />
            </div>
        );
    });
};

    return (
        <div style={{ position: 'relative' }}>
            <div id="map" style={{ width: '100%', height: '900px' }}></div>

            {/* 세부 팝업 */}
            {isDetailPopupVisible && selectedStation && (
                <div className="detail-popup">
                    <button
                        className="close-btn"
                        style={{color:"black"}}
                        onClick={() => setDetailPopupVisible(false)}
                    >
                        ✖
                    </button>
                    <h3>
                        <img src={soil} alt="logo" /> {selectedStation.name}
                        <span
                            className={`favorite-icon ${isFavorite ? 'active' : ''}`}
                            onClick={handleFavoriteClick}
                        >
                            　☆
                        </span>
                    </h3>
                    <p> <strong>[기본정보]</strong></p>
                    <span>- 전화번호: {selectedStation.phone}</span><br/>
                    <span>- 주소: {selectedStation.address}</span>
                    <p><strong>[유가정보]</strong></p>
                    <table className="price-table">
                        <thead>
                            <tr>
                                <th>가격</th>
                                <th>업데이트 날짜</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{selectedStation.price}원</td>
                                <td>{selectedStation.update}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>
                        <strong>[평점] </strong>　
                        {renderStars(selectedStation.rating)} {selectedStation.rating}점
                    </p>
                    <table className="rating-section">
                        <tr>
                            <td>* 화장실 청결도</td>
                            <td>{renderStars(selectedStation.restroomRating)}</td>
                            <td>{selectedStation.restroomRating.toFixed(2)}점</td>
                        </tr>
                        <tr>
                            <td>* 접근성</td>
                            <td>{renderStars(selectedStation.accessRating)}</td>
                            <td>{selectedStation.accessRating.toFixed(2)}점</td>
                        </tr>
                        <tr>
                            <td>* 가격</td>
                            <td>{renderStars(selectedStation.priceRating)}</td>
                            <td>{selectedStation.priceRating.toFixed(2)}점</td>
                        </tr>
                    </table>
                    <p><strong>[부가정보]</strong></p>
                    <div className="additional-info">
                        {selectedStation.convenienceStore === "Y" && <div className="additional"><img src={store} className='icon'/> 편의점</div>}
                        {selectedStation.good === "Y" && <div className="additional"><img src={good} className='icon'/> 인증주유소</div>}
                        {selectedStation.repair === "Y" && <div className="additional"><img src={repair} className='icon'/> 정비소</div>}
                    </div><br/>
                    <div className="action-buttons">
                        <button>경유지로<br/> 설정</button>
                        <button>목적지로<br/> 설정</button>
                        <button onClick={() => setRatingPopupVisible(true)}>평점<br/>등록</button>
                    </div>
                </div>
            )}

            {/* 평점등록 팝업 */}
            {isRatingPopupVisible && (
                <div className="rating-popup">
                    <button className="close-btn" onClick={() => setRatingPopupVisible(false)}>✖</button>
                    <h3 style={{ display: "flex", justifyContent:"center", alignItems: "center", gap: "10px" }}>
                        <img
                            src={review}
                            style={{ width: "30px", height: "auto", verticalAlign: "middle" }}
                            alt="평점 등록"
                        />평점 등록
                   </h3>
                    <p style={{textAlign:'center',fontSize:'10pt'}}>{selectedStation.name} 어떠셨나요? </p>
                    <table>
                        <tr>
                            <td>화장실 청결도</td>
                            <td>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <FaStar
                                        className='star'
                                        key={value}
                                        onClick={() => handleStarClick("restroom", value)}
                                        color={rating.restroom >= value ? "#ffc107" : "#e4e5e9"}
                                    />
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <td>접근성</td>
                            <td>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <FaStar
                                        className='star'
                                        key={value}
                                        onClick={() => handleStarClick("access", value)}
                                        color={rating.access >= value ? "#ffc107" : "#e4e5e9"}
                                    />
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <td>가격</td>
                            <td>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <FaStar
                                        className='star'
                                        key={value}
                                        onClick={() => handleStarClick("price", value)}
                                        color={rating.price >= value ? "#ffc107" : "#e4e5e9"}
                                    />
                                ))}
                            </td>
                        </tr>    
                    </table>
                    <button type="button" className="commit">등록 완료</button>
                </div>
            )}
        </div>
    );
};

export default Maps;
