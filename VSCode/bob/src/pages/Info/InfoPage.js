import React, { useState, useEffect } from 'react';
import Maps from './Maps';
import Recommend from './Recommend';
import Search from './Search';
import "../../static/scss/Info/InfoPage.scss";
import Rbtn from "../../static/images/icons/recommendBTN.png";
import Sbtn from "../../static/images/icons/searchBTN.png";

const InfoPage = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [activePopup, setActivePopup] = useState(null); // 모바일 팝업 상태 관리
    const [stations, setStations] = useState([]); // 주유소 데이터 관리
    const [markerMap, setMarkerMap] = useState(new Map());

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 450);
        };

        handleResize(); // 초기 실행
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        console.log("Updated stations in InfoPage:", stations); // 디버깅용
    }, [stations]);

    const closePopup = () => setActivePopup(null); // 팝업 닫기

    return (
        <div className="info-container">
            {isSmallScreen ? (
                // 모바일 화면: 버튼 렌더링
                <div className="mobile-buttons">
                    <button onClick={() => setActivePopup('recommend')}>
                        <img src={Rbtn} alt="추천" style={{width:'30px',height:'30px'}} />
                    </button>
                    <button onClick={() => setActivePopup('search')}>
                        <img src={Sbtn} alt="찾기" style={{width:'30px',height:'30px'}} />
                    </button>
                </div>
            ) : (
                // 웹 화면: 추천과 검색 컴포넌트 렌더링
                <div className="sidebar">
                    <Recommend stations={stations} markerMap={markerMap}  /> {/* Recommend에 stations 전달 */}
                    <Search stations={stations} markerMap={markerMap} /> {/* Search에 stations 전달 */}
                </div>
            )}

            <div className="main-content">
                <Maps
                    onStationsUpdate={setStations}
                    onMarkerMapUpdate={setMarkerMap}
                />
            </div>

            {/* 모바일 팝업 */}
            {isSmallScreen && activePopup === 'recommend' && (
                <div className="popup mobile-popup" style={{height:'330px', borderRadius:'10px'}}>
                    <div className="popup-content">
                        <button className="close-btn" onClick={closePopup}>✖</button>
                        <Recommend stations={stations} markerMap={markerMap} closePopup={closePopup} />
                    </div>
                </div>
            )}
            {isSmallScreen && activePopup === 'search' && (
                <div className="popup mobile-popup" style={{height:'450px', borderRadius:'10px'}}>
                    <div className="popup-content">
                        <button className="close-btn" onClick={closePopup}>✖</button>
                        <Search stations={stations} markerMap={markerMap} closePopup={closePopup} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default InfoPage;
