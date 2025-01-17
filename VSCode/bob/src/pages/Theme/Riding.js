import React, { useRef, useEffect, useState } from 'react';
import '../../static/scss/Theme/themeriding.scss';
import { fetchTheme } from "../../service/apiService"; // 공통 API 함수 불러오기

const categories = [
  {
    CATEGORY: '끝없이 펼쳐진 바다와 함께하는',
    PLACES: [
      {
        TR_PLACE_ID: 1,
        TR_PLACE_NAME: '동해안의 숨은 비경',
        TR_NUMPRODUCE1: '강원 삼척 이사부길',
        TR_NUMPRODUCE2: '신라 장군 이사부를 따서 지은 길입니다.',
        IMAGE: 'IsabuRoad.PNG',
      },
      {
        TR_PLACE_ID: 2,
        TR_PLACE_NAME: '어우러짐의 미학',
        TR_NUMPRODUCE1: '제주 신풍해안도로',
        TR_NUMPRODUCE2: '제주의 깊은 바다, 현무암, 풍력발전기와 산뜻한 바람 이 모든 것이 어우러지는 최고의 명소.',
        IMAGE: 'Sinpoong.PNG',
      },
      {
        TR_PLACE_ID: 3,
        TR_PLACE_NAME: '노을이 가장 아름다운',
        TR_NUMPRODUCE1: '영광 백수해안도로',
        TR_NUMPRODUCE2: '대한민국 자연경관 대상을 수상한 곳입니다. 환상적인 낙조와 기암괴석으로 이루어진 절벽을 감상하세요.',
        IMAGE: 'YeonggwangBaeksuCoastalRoad.PNG',
      },
      {
        TR_PLACE_ID: 4,
        TR_PLACE_NAME: '이름도 아름다운',
        TR_NUMPRODUCE1: '남해 물미해안도로',
        TR_NUMPRODUCE2: 'S자로 굽이치는 이 길은 남해 최고의 절경이라 할 수 있습니다. 코스 중간 멋진 해변과 방조어부림을 꼭 들러보세요.',
        IMAGE: 'MulmiCoastalRoad.PNG',
      },
    ],
  },
  {
    CATEGORY: '가을 단풍 라이딩 명소',
    PLACES: [
      {
        TR_PLACE_ID: 5,
        TR_PLACE_NAME: '대통령 공식 별장',
        TR_NUMPRODUCE1: '청주 청남대 가로수길',
        TR_NUMPRODUCE2: '남쪽 청와대라는 뜻을 가지고 있으며 "한국의 아름다운 길 100선"에 포함된 명소입니다.',
        IMAGE: 'Cheongnamdae.PNG',
      },
      {
        TR_PLACE_ID: 6,
        TR_PLACE_NAME: '역사와 함께하는',
        TR_NUMPRODUCE1: '경기도 광주 남한산성',
        TR_NUMPRODUCE2: '유네스코 세계문화유산으로 지정된 남한산성의 성벽과 어우러진 와일드한 단풍을 느낄 수 있는 명소.',
        IMAGE: 'Namhansanseong.PNG',
      },
    ],
  },
  {
    CATEGORY: '도시의 야경 라이딩 명소',
    PLACES: [
      {
        TR_PLACE_ID: 7,
        TR_PLACE_NAME: '낮보다 찬란한 밤',
        TR_NUMPRODUCE1: '대구 83타워',
        TR_NUMPRODUCE2: '대구를 대표하는 타워인 83타워입니다. 달과 별, 그리고 도시 불빛이 어우러진 대구를 감상해보세요.',
        IMAGE: '83Tower.PNG',
      },
      {
        TR_PLACE_ID: 8,
        TR_PLACE_NAME: '하늘로 향하는 길',
        TR_NUMPRODUCE1: '서울 북악스카이웨이',
        TR_NUMPRODUCE2: '꼬불꼬불 멋진 코스를 오르면 서울 시내가 발아래 펼쳐지는 곳입니다. 아름다운 팔각정과 서울의 야경을 담아보세요.',
        IMAGE: 'BukakSkyway.PNG',
      },
    ],
  },
];



const Riding = () => {
  const [posts, setPosts] = useState([]); // posts 상태를 관리
  const sectionRefs = useRef([]); // 섹션 참조 관리

  // 특정 카테고리로 스크롤하는 함수
  const scrollToSection = (index) => {
    const offset = -80;
    const sectionTop = sectionRefs.current[index].offsetTop + offset;
    window.scrollTo({ top: sectionTop, behavior: 'smooth' });
  };

  // 백엔드에서 데이터 불러오기
// 백엔드에서 데이터 불러오기
useEffect(() => {
  const loadTheme = async () => {
    try {
      const data = await fetchTheme(); // 백엔드 API 호출
      console.log("가져온 데이터:", data);
      
      // 키 이름 변환
      const transformedData = data.reduce((acc, curr) => {
        const existingCategory = acc.find(item => item.CATEGORY === curr.category);
        
        if (existingCategory) {
          existingCategory.PLACES.push({
            TR_PLACE_ID: curr.tr_PLACE_ID,
            TR_PLACE_NAME: curr.tr_PLACE_NAME,
            TR_NUMPRODUCE1: curr.tr_NUMPRODUCE1,
            TR_NUMPRODUCE2: curr.tr_NUMPRODUCE2,
            IMAGE: curr.image,
            LATITUDE: curr.latitude,
            LONGITUDE: curr.longitude

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
              LATITUDE: curr.latitude,
              LONGITUDE: curr.longitude
            }]
          });
        }
        return acc;
      }, []);
      
      setPosts(transformedData); // 변환된 데이터 설정
    } catch (error) {
      console.error("게시글 불러오기 실패:", error);
      setPosts(categories); // 오류 발생 시 백업 데이터 사용
    }
  };

  loadTheme(); // 데이터 불러오기 실행
}, []);

  return (
    <div className="riding-container">
      <div className="riding-title"></div>
      <div className="photo-box-container">
        <h3 className="photo-box-heading">어떤 테마로 떠나볼까요? </h3>
        <div className="photo-box-wrapper">
          <div className="photo-box" onClick={() => scrollToSection(0)}>
            <img
              src="/images/Riding/Coastline.png"
              alt="어우러짐의 미학"
              className="photo-box-image"
            />
          </div>
          <div className="photo-box" onClick={() => scrollToSection(1)}>
            <img
              src="/images/Riding/AutumnLeaves.png"
              alt="노을이 가장 아름다운"
              className="photo-box-image"
            />
          </div>
          <div className="photo-box" onClick={() => scrollToSection(2)}>
            <img
              src="/images/Riding/NightView.png"
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
              {(category.PLACES || []).map((place) => (
                <div key={place.TR_PLACE_ID} className="riding-frame">
                  <div className="riding-content">
                    <img
                      src={`/images/Riding/${place.IMAGE || 'default.png'}`}
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