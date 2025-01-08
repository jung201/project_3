import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import '../../static/scss/Theme/themeriding.scss';

// 카테고리와 장소 데이터를 배열로 정의
const categories = [
  {
    category: '끝없이 펼쳐진 바다와 함께하는',
    places: [
      { id: 1, title: '동해안의 숨은 비경', location: '강원 삼척 이사부길', description: '신라 장군 이사부를 따서 지은 길입니다. 이사부 장군처럼 생동감 넘치는 동해 바다를 느껴보세요.', image: '이사부길.PNG' },
      { id: 2, title: '어우러짐의 미학', location: '제주 신풍해안도로', description: '제주의 깊은 바다, 현무암, 풍력발전기와 산뜻한 바람 이 모든 것이 어우러지는 최고의 명소.', image: '신풍해안도로.PNG' },
      { id: 3, title: '노을이 가장 아름다운', location: '영광 백수해안도로', description: '대한민국 자연경관 대상을 수상한 곳입니다. 환상적인 낙조와 기암괴석으로 이루어진 절벽을 감상하세요.', image: '영광백수해안도로.PNG' },
      { id: 4, title: '이름도 아름다운', location: '남해 물미해안도로', description: 'S자로 굽이치는 이 길은 남해 최고의 절경이라 할 수 있습니다. 코스 중간 멋진 해변과 방조어부림을 꼭 들러보세요.', image: '물미해안도로.PNG' },
    ],
  },
  {
    category: '가을 단풍 라이딩 명소',
    places: [
      { id: 5, title: '대통령 공식 별장', location: '청주 청남대 가로수길', description: '남쪽 청와대라는 뜻을 가지고 있으며 "한국의 아름다운 길 100선"에 포함된 명소입니다.', image: '청남대.PNG' },
      { id: 6, title: '역사와 함께하는', location: '경기도 광주 남한산성', description: '유네스코 세계문화유산으로 지정된 남한산성의 성벽과 어우러진 와일드한 단풍을 느낄 수 있는 명소.', image: '남한산성.PNG' },
    ],
  },
  {
    category: '도시의 야경 라이딩 명소',
    places: [
      { id: 7, title: '낮보다 찬란한 밤', location: '대구 83타워', description: '대구를 대표하는 타워인 83타워입니다. 달과 별, 그리고 도시 불빛이 어우러진 대구를 감상해보세요.', image: '83타워.PNG' },
      { id: 8, title: '하늘로 향하는 길', location: '서울 북악스카이웨이', description: '꼬불꼬불 멋진 코스를 오르면 서울 시내가 발아래 펼쳐지는 곳입니다. 아름다운 팔각정과 서울의 야경을 담아보세요.', image: '북악스카이웨이.PNG' },
    ],
  },
];

const Riding = () => {
  const [posts, setPosts] = useState([]); // 백엔드 데이터 상태
  const sectionRefs = useRef([]); // 섹션 참조용 ref 배열

  // 특정 카테고리로 스크롤하는 함수
  const scrollToSection = (index) => {
    const offset = -80;
    const section = sectionRefs.current[index];
    if (section) {
      const sectionTop = section.offsetTop + offset;
      window.scrollTo({ top: sectionTop, behavior: 'smooth' });
    }
  };

  // 백엔드에서 데이터 불러오기
  useEffect(() => {
    axios
      .get('http://192.168.0.93:3006/api') // API 경로
      .then((response) => {
        console.log(response.data); // 데이터 출력 확인
        setPosts(response.data); // 게시글 데이터 설정
      })
      .catch((error) => {
        console.error('게시글 불러오기 에러:', error);
      });
  }, []);

  return (
    <div className="riding-container">
      {/* 페이지 메인 제목 */}
      <h1 className="riding-title"></h1>

      {/* 사진 박스 3개 컨테이너 */}
      <div className="photo-box-container">
        <h3 className="photo-box-heading">어떤 테마로 떠나볼까요? </h3>
        <div className="photo-box-wrapper">
          <div className="photo-box" onClick={() => scrollToSection(0)}>
            <img src={require('../../static/images/Riding/해안.png')} alt="어우러짐의 미학" className="photo-box-image" />
          </div>
          <div className="photo-box" onClick={() => scrollToSection(1)}>
            <img src={require('../../static/images/Riding/단풍.png')} alt="노을이 가장 아름다운" className="photo-box-image" />
          </div>
          <div className="photo-box" onClick={() => scrollToSection(2)}>
            <img src={require('../../static/images/Riding/야경.png')} alt="야간" className="photo-box-image" />
          </div>
        </div>
      </div>

      {/* 카테고리별 명소를 순회하며 렌더링 */}
      {Array.isArray(posts) && posts.length > 0
        ? posts.map((category, index) => (
            <div key={index} className="category-section" ref={(el) => (sectionRefs.current[index] = el)}>
              <h2 className="category-title">{category.category}</h2>
              <div className="riding-grid">
                {category.places.map((place) => (
                  <div key={place.id} className="riding-frame">
                    <div className="riding-content">
                      <img src={require(`../../static/images/Riding/${place.image}`)} alt={place.title} className="riding-image" />
                      <div className="riding-header">
                        <h3 className="riding-frame-title">{place.title}</h3>
                        <p className="riding-location"># {place.location}</p>
                      </div>
                      <div className="riding-description-container">
                        <p className="riding-description">{place.description}</p>
                        <button className="set-dest-btn" onClick={() => alert(`${place.location}을(를) 목적지로 설정하였습니다.`)}>
                          목적지 설정
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        : categories.map((category, index) => (
            <div key={index} className="category-section" ref={(el) => (sectionRefs.current[index] = el)}>
              <h2 className="category-title">{category.category}</h2>
              <div className="riding-grid">
                {category.places.map((place) => (
                  <div key={place.id} className="riding-frame">
                    <div className="riding-content">
                      <img src={require(`../../static/images/Riding/${place.image}`)} alt={place.title} className="riding-image" />
                      <div className="riding-header">
                        <h3 className="riding-frame-title">{place.title}</h3>
                        <p className="riding-location"># {place.location}</p>
                      </div>
                      <div className="riding-description-container">
                        <p className="riding-description">{place.description}</p>
                        <button className="set-dest-btn" onClick={() => alert(`${place.location}을(를) 목적지로 설정하였습니다.`)}>
                          목적지 설정
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
    </div>
  );
};

export default Riding;
