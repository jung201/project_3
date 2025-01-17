import React, { useState } from "react";
import "../static/scss/popup/info-popup.scss"; // SCSS 파일 임포트
import bobImage from "../static/images/bob_1.png";

const Popup = ({ onClose }) => {
  // ⭐ 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const [isFavorite, setIsFavorite] = useState(false); // 즐겨찾기 상태
  const [showLoginPopup, setShowLoginPopup] = useState(false); // 로그인 팝업
  const [showRatingPopup, setShowRatingPopup] = useState(false); // ⭐ 평점 팝업 추가

  // ⭐ 즐겨찾기 클릭 함수
  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      setShowLoginPopup(true); // 로그인 유도 팝업 열기
    } else {
      setIsFavorite(!isFavorite); // 즐겨찾기 토글
    }
  };

  // ⭐ 팝업 닫기 함수
  const closeLoginPopup = () => setShowLoginPopup(false);
  const closeRatingPopup = () => setShowRatingPopup(false); // ⭐ 평점 팝업 닫기

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        {/* 팝업 헤더 */}
        <div className="popup-header">
          <img src={bobImage} alt="logo" className="logo" />
          <span className="title">만수르주유소</span>
          <button
            className={`favorite-btn ${isFavorite ? "active" : ""}`}
            onClick={toggleFavorite}
          >
            ★
          </button>
          <button className="close-btn" onClick={onClose}>
            X
          </button>
        </div>

        {/* 기본정보 */}
        <div className="section">
          <div className="title">[기본정보]</div>
          <p>전화번호: 02-1234-1234</p>
          <p>주소: 충남 천안시 서북구 광장로 231</p>
        </div>

        {/* 유가정보 */}
        <div className="section">
          <div className="title">[유가정보]</div>
          <div className="oil-price">
            <div className="oil-price-1">
              <span>가 격</span>
              <span>업데이트 날짜</span>
            </div>
            <div className="oil-price-2">
              <span>1650원</span>
              <span>2024. 12. 22 07:30:12</span>
            </div>
          </div>
        </div>

        {/* 평점 */}
        <div className="section">
          <div className="title">[평점] ⭐⭐⭐⭐☆</div>
          <p className="score">4.23점</p>
          <div className="stars-section">
            <p>
              화장실 청결도<span className="stars">⭐⭐⭐⭐☆</span>
            </p>
            <p>
              접근성<span className="stars">⭐⭐⭐⭐⭐</span>
            </p>
            <p>
              가 격<span className="stars">⭐⭐⭐⭐☆</span>
            </p>
          </div>
        </div>

        {/* 부가정보 */}
        <div className="section">
          <div className="title">[부가정보]</div>
          <button className="btn">편의점</button>
          <button className="btn">24시간</button>
        </div>

        <div className="extra-info">
          <button className="btn">경유지로 선택</button>
          <button className="btn">목적지로 선택</button>
          <button className="btn" onClick={() => setShowRatingPopup(true)}>
            평점쓰기
          </button>
        </div>
      </div>

      {/* ⭐ 로그인 유도 팝업 */}
      {showLoginPopup && (
        <div className="login-popup-overlay" onClick={closeLoginPopup}>
          <div className="login-popup" onClick={(e) => e.stopPropagation()}>
            <p>로그인이 필요한 기능입니다! 🥺</p>
            <button className="btn" onClick={closeLoginPopup}>
              확인
            </button>
          </div>
        </div>
      )}

      {/* ⭐ 평점 팝업 */}
      {showRatingPopup && (
        <div className="rating-popup-overlay" onClick={closeRatingPopup}>
          <div className="rating-popup" onClick={(e) => e.stopPropagation()}>
            <div className="title">평점 등록</div>
            <div className="rating-section">
              <div className="clean">
                <div className="num">1 2 3 4 5</div>
                <p>화장실 청결도</p>
                {[1, 2, 3, 4, 5].map((num) => (
                  <input
                    key={num}
                    type="radio"
                    name="cleanliness"
                    value={num}
                  />
                ))}
              </div>
              <div className="bility">
                <p>접근성</p>
                {[1, 2, 3, 4, 5].map((num) => (
                  <input
                    key={num}
                    type="radio"
                    name="accessibility"
                    value={num}
                  />
                ))}
              </div>
              <div className="price">
                <p>가 격</p>
                {[1, 2, 3, 4, 5].map((num) => (
                  <input key={num} type="radio" name="price" value={num} />
                ))}
              </div>
            </div>
            <button className="btn" onClick={closeRatingPopup}>
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
