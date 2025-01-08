import React, { useState } from 'react';
import DestMap from './DestMap';
import SearchDest from './SearchDest';
import RecommendSTN from './RecommendSTN';
import CameraRegister from './CameraRegister'; // 새로운 컴포넌트
import '../../static/scss/Search/MainMapPage.scss';

const MainMapPage = () => {
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [isRecommendPopupOpen, setRecommendPopupOpen] = useState(false);
    const [waypoint, setWaypoint] = useState(null);
    const [activePopup, setActivePopup] = useState('search'); // 현재 활성화된 팝업 관리 ('search', 'camera', null)

    const handleRecommendPopup = () => {
        setRecommendPopupOpen(true);
    };

    const handleStationSelect = (station) => {
        setWaypoint(station);
        setRecommendPopupOpen(false);
    };

    const togglePopup = (popupType) => {
        setActivePopup((prev) => (prev === popupType ? null : popupType));
    };

    return (
        <div className="main-map-page">
            {/* 지도 화면 */}
            <div className="map-container">
                <DestMap
                    selectedDestination={selectedDestination}
                    waypoint={waypoint}
                    onRecommendPopup={handleRecommendPopup}
                />
            </div>

            {/* SearchDest 팝업 */}
            {activePopup === 'search' && (
                <div className="search-overlay">
                    <SearchDest
                        onClose={() => togglePopup('search')}
                        onDestinationSelect={setSelectedDestination}
                        waypoint={waypoint}
                    />
                </div>
            )}

            {/* RecommendSTN 팝업 */}
            {isRecommendPopupOpen && (
                <RecommendSTN
                    onClose={() => setRecommendPopupOpen(false)}
                    onStationSelect={handleStationSelect}
                />
            )}

            {/* CameraRegister 팝업 */}
            {activePopup === 'camera' && (
                <CameraRegister onClose={() => togglePopup('camera')} />
            )}

            {/* 우측 하단 아이콘 */}
            <div className="floating-icons">
                <button
                    className={`icon-btn ${activePopup === 'search' ? 'active' : ''}`}
                    onClick={() => togglePopup('search')}
                >
                    🔍
                </button>
                <button
                    className={`icon-btn ${activePopup === 'camera' ? 'active' : ''}`}
                    onClick={() => togglePopup('camera')}
                >
                    📷
                </button>
            </div>
        </div>
    );
};

export default MainMapPage;
