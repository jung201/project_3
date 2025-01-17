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

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 450);
        };

        handleResize(); // 초기 실행
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const closePopup = () => setActivePopup(null); // 팝업 닫기

    return (
        <div className="info-container">
            {isSmallScreen ? (
                // 모바일 화면: 버튼 렌더링
                <div className="mobile-buttons">
                    <button onClick={() => setActivePopup('recommend')}>
                        <img src={Rbtn} alt="추천" />
                    </button>
                    <button onClick={() => setActivePopup('search')}>
                        <img src={Sbtn} alt="찾기" />
                    </button>
                </div>
            ) : (
                // 웹 화면: 사이드바 렌더링
                <div className="sidebar">
                    <Recommend />
                    <Search />
                </div>
            )}

            <div className="main-content">
                <Maps />
            </div>

            {/* 모바일 팝업 */}
            {isSmallScreen && activePopup === 'recommend' && (
                <div className="popup mobile-popup">
                    <div className="popup-content">
                        <button className="close-btn" onClick={closePopup}>✖</button>
                        <Recommend />
                    </div>
                </div>
            )}
            {isSmallScreen && activePopup === 'search' && (
                <div className="popup mobile-popup">
                    <div className="popup-content">
                        <button className="close-btn" onClick={closePopup}>✖</button>
                        <Search />
                    </div>
                </div>
            )}
        </div>
    );
};

export default InfoPage;
