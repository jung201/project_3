import React, { useEffect, useState } from "react";
import red from "../../static/images/icons/red.png";
import yellow from "../../static/images/icons/yellow.png";
import green from "../../static/images/icons/green.png";
import soil from "../../static/images/stationLogo/soil.PNG";
import store from "../../static/images/icons/store.PNG";
import repair from "../../static/images/icons/repair.PNG";
import good from '../../static/images/icons/good.PNG';
import review from "../../static/images/icons/review.PNG";
import "../../static/scss/Info/Popup.scss";
import { FaStar } from "react-icons/fa"; // 별점 아이콘

const Maps = () => {
    const [stations, setStations] = useState([]);
    const [selectedStation, setSelectedStation] = useState(null); // 세부정보 데이터
    const [isDetailPopupVisible, setDetailPopupVisible] = useState(false); // 세부정보 팝업
    const [isRatingPopupVisible, setRatingPopupVisible] = useState(false); // 평점등록 팝업
    const [rating, setRating] = useState({ restroom: 0, access: 0, price: 0 }); // 평점 등록 값
    const [activeInfoWindow, setActiveInfoWindow] = useState(null); // 현재 열려 있는 InfoWindow
    const [currentPosition, setCurrentPosition] = useState(null); // 현재 위치

    useEffect(() => {
        const loadKakaoMap = () => {
            const script = document.createElement("script");
            script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=8d4462d3e1aeb898f4a7fde7440dec38&autoload=false`;
            script.async = true;

            script.onload = () => {
                window.kakao.maps.load(() => {
                    const fetchStations = async () => {
                        try {
                            const response = await fetch("/api/gas-stations-with-price");
                            const data = await response.json();
                            setStations(data);

                            const mapContainer = document.getElementById("map");
                            const mapOptions = {
                                center: new window.kakao.maps.LatLng(36.81157, 127.14639),
                                level: 6,
                            };
                            const map = new window.kakao.maps.Map(mapContainer, mapOptions);

                            const globalInfoWindow = new window.kakao.maps.InfoWindow();

                            // 현재 위치 가져오기
                            if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition((position) => {
                                    const { latitude, longitude } = position.coords;
                                    setCurrentPosition({ latitude, longitude });

                                    // 현재 위치 마커 추가
                                    const currentMarker = new window.kakao.maps.Marker({
                                        position: new window.kakao.maps.LatLng(latitude, longitude),
                                        map,
                                    });

                                    // 지도 중심을 현재 위치로 이동
                                    map.setCenter(new window.kakao.maps.LatLng(latitude, longitude));

                                    const infoWindow = new window.kakao.maps.InfoWindow({
                                        content: `<div style="padding:5px;">현재 위치</div>`,
                                    });

                                    window.kakao.maps.event.addListener(
                                        currentMarker,
                                        "click",
                                        () => {
                                            infoWindow.open(map, currentMarker);
                                        }
                                    );
                                });
                            }

                            data.forEach((station) => {
                                const markerImage = new window.kakao.maps.MarkerImage(
                                    station.PRICE_DIFF > 30
                                        ? red
                                        : station.PRICE_DIFF >= -30
                                        ? yellow
                                        : green,
                                    new window.kakao.maps.Size(40, 40)
                                );
                            
                                const marker = new window.kakao.maps.Marker({
                                    position: new window.kakao.maps.LatLng(
                                        station.LATITUDE,
                                        station.LONGITUDE
                                    ),
                                    map,
                                    image: markerImage,
                                });
                            
                                window.kakao.maps.event.addListener(marker, "click", () => {
                                    if (activeInfoWindow) {
                                        activeInfoWindow.close();
                                    }
                            
                                    globalInfoWindow.setContent(`
                                        <div class="info-popup">
                                            <button id="closePopup" class="close-btn">✖</button>
                                            <strong>${station.NAME}</strong><br/>
                                            브랜드: ${station.BRAND}<br/>
                                            거리: ${station.DISTANCE}m<br/>
                                            가격: ${station.PRICE}원<br/>
                                            <span>전국 평균 대비: ${Math.round(station.PRICE_DIFF)}원</span><br/>
                                            <button id="detailView" class="info-btn">세부정보보기</button>
                                        </div>
                                    `);
                            
                                    globalInfoWindow.open(map, marker);
                                    setActiveInfoWindow(globalInfoWindow);
                            
                                    setTimeout(() => {
                                        const closeBtn = document.getElementById("closePopup");
                                        if (closeBtn) {
                                            closeBtn.addEventListener("click", () => {
                                                globalInfoWindow.close();
                                                setActiveInfoWindow(null);
                                            });
                                        }
                            
                                        const detailBtn = document.getElementById("detailView");
                                        if (detailBtn) {
                                            detailBtn.addEventListener("click", async () => {
                                                try {
                                                    console.log("Station object:", station);
                                                    console.log("Station Code:", station.STATION_CODE);
                                        
                                                    const stationCode = station.STATION_CODE; // stationCode 사용
                                                    if (!stationCode) {
                                                        console.error("Invalid stationCode:", stationCode);
                                                        return;
                                                    }
                                        
                                                    const response = await fetch(`/api/gas-stations/${stationCode}`);
                                                    if (!response.ok) {
                                                        console.error("Error fetching station details:", response.status, response.statusText);
                                                        return;
                                                    }
                                        
                                                    const stationDetails = await response.json();
                                                    console.log("Fetched station details:", stationDetails);
                                                    
                                                    // 평균 평점 API 호출
                                                    const averageRatings = await fetchAverageRatings(stationCode);
                                                    stationDetails.averageRatings = averageRatings; // Merge data

                                                    console.log("Station details with average ratings:", {
                                                        ...stationDetails,
                                                        averageRatings,
                                                    });

                                                    setSelectedStation(stationDetails);
                                                    setDetailPopupVisible(true);
                                                } catch (error) {
                                                    console.error("Error fetching station details:", error);
                                                } finally {
                                                    globalInfoWindow.close();
                                                    setActiveInfoWindow(null);
                                                }
                                            });
                                        }
                                        
                                    }, 0);
                                });
                            });
                            
                        } catch (error) {
                            console.error("Error fetching stations:", error);
                        }
                    };

                    fetchStations();
                });
            };

            document.head.appendChild(script);
        };

        loadKakaoMap();
    }, []);

    const handleStarClick = (category, value) => {
        setRating((prev) => ({ ...prev, [category]: value }));
    };

    const fetchAverageRatings = async (stationCode) => {
        try {
            const response = await fetch(`/api/gas-stations/${stationCode}/average-ratings`);
            if (!response.ok) {
                throw new Error("Failed to fetch average ratings.");
            }
            const data = await response.json();
            console.log("Fetched average ratings:", data); // 데이터 확인
            return data;
        } catch (error) {
            console.error("Error fetching average ratings:", error);
            return { restroomAvg: "0.0", accessAvg: "0.0", priceAvg: "0.0" };
        }
    };
    

    const submitRating = async () => {
        try {
            const payload = {
                stationCode: selectedStation.stationCode, // 주유소 코드
                restroomRating: rating.restroom,
                accessRating: rating.access,
                priceRating: rating.price,
            };

            const response = await fetch("/api/gas-stations/rating", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("평점 등록에 실패했습니다.");
            }

            alert("평점이 성공적으로 등록되었습니다!");
            setRatingPopupVisible(false);
            setRating({ restroom: 0, access: 0, price: 0 });
        } catch (error) {
            console.error("Error submitting rating:", error);
            alert("평점 등록 중 오류가 발생했습니다.");
        }
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <FaStar
                key={index}
                color={rating > index ? "#ffc107" : "#e4e5e9"}
                style={{ marginRight: "5px" }}
            />
        ));
    };
    return (
        <div style={{ position: "relative" }}>
            <div id="map" style={{ width: "100%", height: "900px" }}></div>

            {/* 세부정보 팝업 */}
            {isDetailPopupVisible && selectedStation && (
                <div className="detail-popup">
                    <button
                        className="close-btn"
                        onClick={() => setDetailPopupVisible(false)}
                    >
                        ✖
                    </button>
                    <h3>
                        <img src={soil} alt="logo" /> {selectedStation.name}
                        <span style={{ cursor: "pointer" }}>☆</span>
                    </h3>
                    <p>
                        <strong>[기본정보]</strong>
                    </p>
                    <span>- 전화번호: {selectedStation.tel}</span>
                    <br />
                    <span>- 주소: {selectedStation.address}</span>
                    <p>
                        <strong>[유가정보]</strong>
                    </p>
                    <table className="price-table">
                        <thead>
                            <tr>
                                <th>가격</th>
                                <th>업데이트 날짜</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{selectedStation.oilPrice}원</td>
                                <td>{selectedStation.updateTime}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>
                        <strong>[평점]</strong>　
                        {renderStars(Math.round(parseFloat(selectedStation.averageRatings?.restroomAvg || "0.0")))} 평균 {selectedStation.averageRatings?.restroomAvg || "0.0"}점
                    </p>
                    <table className="rating-section">
                        <tr>
                            <td>- 화장실 청결도</td>
                            <td>{renderStars(Math.round(parseFloat(selectedStation.averageRatings?.restroomAvg || "0.0")))}</td>
                            <td>{selectedStation.averageRatings?.restroomAvg || "0.0"}점</td>
                        </tr>
                        <tr>
                            <td>- 접근성</td>
                            <td>{renderStars(Math.round(parseFloat(selectedStation.averageRatings?.accessAvg || "0.0")))}</td>
                            <td>{selectedStation.averageRatings?.accessAvg || "0.0"}점</td>
                        </tr>
                        <tr>
                            <td>- 가격</td>
                            <td>{renderStars(Math.round(parseFloat(selectedStation.averageRatings?.priceAvg || "0.0")))}</td>
                            <td>{selectedStation.averageRatings?.priceAvg || "0.0"}점</td>
                        </tr>
                    </table>

                    <p><strong>[부가정보]</strong></p>
                    <div className="additional-info">
                        {selectedStation.cvsYn === "Y" && <div className="additional"><img src={store} className='icon'/> 편의점</div>}
                        {selectedStation.carWashYn === "Y" && <div className="additional"><img src={good} className='icon'/> 세차장</div>}
                        {selectedStation.mainYn === "Y" && <div className="additional"><img src={repair} className='icon'/> 정비소</div>}
                    </div><br/>
                    <div className="action-buttons">
                        <button>경유지로 설정</button>
                        <button>목적지로 설정</button>
                        <button onClick={() => setRatingPopupVisible(true)}>평점 등록</button>
                    </div>
                </div>
            )}

            {/* 평점등록 팝업 */}
            {isRatingPopupVisible && (
                <div className="rating-popup">
                    <button
                        className="close-btn"
                        onClick={() => setRatingPopupVisible(false)}
                    >
                        ✖
                    </button>
                    <h3>
                        <img
                            src={review}
                            alt="평점 등록"
                            style={{ width: "30px", marginRight: "10px" }}
                        />
                        평점 등록
                    </h3>
                    <p>{selectedStation.NAME}의 평가를 입력해주세요.</p>
                    <table>
                        <tbody>
                            <tr>
                                <td>- 화장실 청결도</td>
                                <td>
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <FaStar
                                            key={value}
                                            onClick={() =>
                                                handleStarClick("restroom", value)
                                            }
                                            color={
                                                rating.restroom >= value
                                                    ? "#ffc107"
                                                    : "#e4e5e9"
                                            }
                                            style={{ cursor: "pointer" }}
                                        />
                                    ))}
                                </td>
                            </tr>
                            <tr>
                                <td>- 접근성</td>
                                <td>
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <FaStar
                                            key={value}
                                            onClick={() =>
                                                handleStarClick("access", value)
                                            }
                                            color={
                                                rating.access >= value
                                                    ? "#ffc107"
                                                    : "#e4e5e9"
                                            }
                                            style={{ cursor: "pointer" }}
                                        />
                                    ))}
                                </td>
                            </tr>
                            <tr>
                                <td>- 가격</td>
                                <td>
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <FaStar
                                            key={value}
                                            onClick={() =>
                                                handleStarClick("price", value)
                                            }
                                            color={
                                                rating.price >= value
                                                    ? "#ffc107"
                                                    : "#e4e5e9"
                                            }
                                            style={{ cursor: "pointer" }}
                                        />
                                    ))}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="commit" onClick={submitRating}>
                        등록 완료
                    </button>
                </div>
            )}
        </div>
    );
};

export default Maps;
