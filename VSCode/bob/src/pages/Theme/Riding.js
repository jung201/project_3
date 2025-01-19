import React, { useRef, useEffect, useState } from 'react';
import '../../static/scss/Theme/themeriding.scss';

const Riding = () => {
  const [posts, setPosts] = useState([]); // 상태 관리
  const sectionRefs = useRef([]); // 섹션 참조 관리

  // 데이터 불러오기
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const response = await fetch("http://192.168.0.93:3006/riding/api"); // 백엔드 API 호출
        const data = await response.json();
        console.log("백엔드에서 가져온 데이터:", data);

        // 데이터 변환
        const transformedData = data.reduce((acc, curr) => {
          const existingCategory = acc.find(item => item.CATEGORY === curr.category);

          if (existingCategory) {
            existingCategory.PLACES.push({
              TR_PLACE_ID: curr.tr_PLACE_ID,
              TR_PLACE_NAME: curr.tr_PLACE_NAME,
              TR_NUMPRODUCE1: curr.tr_NUMPRODUCE1,
              TR_NUMPRODUCE2: curr.tr_NUMPRODUCE2,
              IMAGE: curr.image,
            });
          } else {
            acc.push({
              CATEGORY: curr.category,
              PLACES: [{
                TR_PLACE_ID: curr.tr_PLACE_ID,
                TR_PLACE_NAME: curr.tr_PLACE_NAME,
                TR_NUMPRODUCE1: curr.tr_NUMPRODUCE1,
                TR_NUMPRODUCE2: curr.tr_NUMPRODUCE2,
                IMAGE: curr.image,
              }]
            });
          }
          return acc;
        }, []);
        
        setPosts(transformedData); // 상태 업데이트
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
        setPosts([]); // 실패 시 빈 배열 설정
      }
    };

    loadTheme(); // 데이터 로드
  }, []);

  // 특정 섹션으로 스크롤
  const scrollToSection = (index) => {
    const offset = -80;
    const sectionTop = sectionRefs.current[index].offsetTop + offset;
    window.scrollTo({ top: sectionTop, behavior: 'smooth' });
  };

  return (
    <div className="riding-container">
      <div className="riding-title"></div>
      <div className="photo-box-container">
        <h3 className="photo-box-heading" style={{textAlign:'center'}}>어떤 테마로 떠나볼까요? </h3>
        <div className="photo-box-wrapper">
          <div className="photo-box" onClick={() => scrollToSection(0)}>
            <img
              src="http://192.168.0.93:3006/images/Riding/Coastline.png"
              alt="어우러짐의 미학"
              className="photo-box-image"
            />
          </div>
          <div className="photo-box" onClick={() => scrollToSection(1)}>
            <img
              src="http://192.168.0.93:3006/images/Riding/AutumnLeaves.png"
              alt="노을이 가장 아름다운"
              className="photo-box-image"
            />
          </div>
          <div className="photo-box" onClick={() => scrollToSection(2)}>
            <img
              src="http://192.168.0.93:3006/images/Riding/NightView.png"
              alt="야간"
              className="photo-box-image"
            />
          </div>
        </div>
      </div>

      {posts.length > 0 ? (
        posts.map((category, index) => (
          <div key={index} className="category-section" ref={(el) => (sectionRefs.current[index] = el)}>
            <h2 className="category-title">{category.CATEGORY}</h2>
            <div className="riding-grid">
              {category.PLACES.map((place) => (
                <div key={place.TR_PLACE_ID} className="riding-frame">
                  <div className="riding-content">
                    <img
                      src={`http://192.168.0.93:3006/images/Riding/${place.IMAGE}`}
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
                        onClick={() => alert(`${place.TR_NUMPRODUCE1}을(를) 목적지로 설정하였습니다.`)}
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
