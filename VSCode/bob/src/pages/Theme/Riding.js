import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import '../../static/scss/Theme/themeriding.scss';
import { fetchTheme } from "../../service/apiService"; // 공통 API 함수 불러오기

const Riding = () => {
  const [posts, setPosts] = useState([]); // posts 상태를 관리
  const sectionRefs = useRef([]); // 섹션 참조 관리

  // 특정 카테고리로 스크롤하는 함수
  const scrollToSection = (index) => {
    const offset = -80;
    const sectionTop = sectionRefs.current[index].offsetTop + offset;
    window.scrollTo({ top: sectionTop, behavior: 'smooth' });
  };


  //-=================================================================


  // 백엔드에서 데이터 불러오기
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const data = await fetchTheme();
        setPosts(data); // 게시글 데이터 설정
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
      }
    };

    loadTheme(); // 데이터 불러오기 실행
  }, []); // 컴포넌트 마운트 시 1회 실행

//-=================================================================


  return (
    <div className="riding-container">
      {/* 페이지 메인 제목 */}

      {/* 사진 박스 3개 컨테이너 */}
      <div className="riding-title"></div>
      <div className="photo-box-container">
        <h3 className="photo-box-heading">어떤 테마로 떠나볼까요? </h3>
        <div className="photo-box-wrapper">
          <div className="photo-box" onClick={() => scrollToSection(0)}>
            <img
              src={require('../../static/images/Riding/해안.png')}
              alt="어우러짐의 미학"
              className="photo-box-image"
            />
          </div>

          <div className="photo-box" onClick={() => scrollToSection(1)}>
            <img
              src={require('../../static/images/Riding/단풍.png')}
              alt="노을이 가장 아름다운"
              className="photo-box-image"
            />
          </div>

          <div className="photo-box" onClick={() => scrollToSection(2)}>
            <img
              src={require('../../static/images/Riding/야경.png')}
              alt="야간"
              className="photo-box-image"
            />
          </div>
        </div>
      </div>

      {posts.length > 0 ? (
  posts.map((category, index) => (
    <div key={index} className="category-section" ref={(el) => (sectionRefs.current[index] = el)}>
      <h2 className="category-title">{category.category}</h2>
      <div className="riding-grid">
        {(category.places || []).map((place) => (
          <div key={place.TR_PLACE_ID} className="riding-frame">
                  <div className="riding-content">
                  <img
                    src={`/images/Riding/${place.image}`}
                      alt={place.TR_PLACE_NAME}
                      className="riding-image"
                  />
                    <div className="riding-header">
                      <h3 className="riding-frame-title">{place.TR_PLACE_NAME}</h3>
                      <p className="riding-location"># {place.TR_NUMPRODUCE1}</p>
                    </div>
                    <div className="riding-description-container">
                      <p className="riding-description"># {place.TR_NUMPRODUCE2}</p>
                      <button
                        className="set-dest-btn"
                        onClick={() => alert(`${place.TR_PLACE_NAME}을(를) 목적지로 설정하였습니다.`)}
                      >
                        목적지 설정
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>데이터를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default Riding;
