import React, { useState } from 'react';
import '../../static/scss/Search/Sidebar.scss';

const SearchDest = ({ onClose, onDestinationSelect, waypoint }) => {
    const [departure] = useState('강남역'); // 기본값 강남역
    const [destination, setDestination] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isListening, setIsListening] = useState(false);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    // 음성인식 시작
    const startListening = () => {
        if (!recognition) {
            alert('음성 인식이 지원되지 않는 브라우저입니다.');
            return;
        }

        setIsListening(true);
        recognition.start();

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setDestination(transcript); // 검색창에 음성으로 입력된 내용 설정
            handleSearch(transcript); // 검색 실행
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            console.error('음성 인식 에러:', event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };
    };

    const stopListening = () => {
        if (recognition) recognition.stop();
        setIsListening(false);
    };

    // 검색 실행
    const handleSearch = (query) => {
        const results = [
            { name: '역삼역', address: '서울시 역삼동 124', lat: 37.500622, lng: 127.036456 },
            { name: '삼성역', address: '서울시 삼성동 23', lat: 37.508844, lng: 127.063160 },
            { name: '선릉역', address: '서울시 선릉동 11', lat: 37.504503, lng: 127.049033 },
        ].filter((item) => item.name.includes(query));
        setSearchResults(results);
    };

    const handleDestinationSelect = (result) => {
        setDestination(result.name);
        setSearchResults([]);
        onDestinationSelect(result); // 부모 컴포넌트로 선택된 장소 전달
    };

    return (
        <div className="search-dest">
            {/* 닫기 버튼 */}
            <button className="close-btn" onClick={onClose}>
                ✖
            </button>

            <h3>어디를 가시나요?</h3>

            {/* 출발지 */}
            <div className="departure-container">
                <label>출발지:</label>
                <input
                    className="searchInput"
                    type="text"
                    value={departure}
                    readOnly
                />
            </div>

            {/* 경유지 */}
            {waypoint && (
                <div className="waypoint-container">
                    <label>경유지:</label>
                    <input
                        className="searchInput"
                        type="text"
                        value={waypoint.name}
                        readOnly
                    />
                </div>
            )}

            {/* 도착지 */}
            <div className="destination-container">
                <label>도착지:</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        className="searchInput"
                        type="text"
                        value={destination}
                        onChange={(e) => {
                            setDestination(e.target.value);
                            handleSearch(e.target.value);
                        }}
                        placeholder="도착지를 검색하세요"
                    />
                    <button
                        className={`voice-btn ${isListening ? 'listening' : ''}`}
                        onClick={() => {
                            if (isListening) {
                                stopListening(); // 음성인식 중지
                            } else {
                                startListening(); // 음성인식 시작
                            }
                        }}
                    >
                        {isListening ? '🎙️ 듣는 중...' : '🎤 음성 입력'}
                    </button>
                </div>
                {searchResults.length > 0 && (
                    <div className="search-results">
                        {searchResults.map((result, index) => (
                            <div
                                key={index}
                                className="search-result-item"
                                onClick={() => handleDestinationSelect(result)}
                            >
                                <span style={{ fontSize: '13pt' }}>
                                    {result.name}
                                </span>
                                <span style={{ fontSize: '10pt' }}>
                                    　{result.address}　
                                </span>
                                <button
                                    className="set-destination-btn"
                                    onClick={() => handleDestinationSelect(result)}
                                >
                                    장소확인
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 경로찾기 버튼 */}
            <button className="findPathBTN">경로찾기</button>
        </div>
    );
};

export default SearchDest;
