import React from "react";
import "../../static/scss/MainPage/mainIcon.scss";
import price from "../../static/images/icons/price.png";
import chooy from "../../static/images/icons/chooy.png";
import station from "../../static/images/icons/station.png";
import sido from "../../static/images/icons/sido.png";

const MainIcon = () => {

  // 스크롤 이동 함수
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId); // 섹션 ID 가져오기
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "center" }); // 부드러운 스크롤 이동
    }
  };

  return (
    <div className="i-container">
      <div className="i-price" onClick={() => scrollToSection("today-price")}>
        <img src={price} alt="프로필" className="i-price-img" />
        유가 정보
      </div>
      <div className="i-trend" onClick={() => scrollToSection("oil-trend")}>
        <img src={chooy} alt="프로필" className="i-trend-img" />
        유가 추이
      </div>
      <div className="i-top" onClick={() => scrollToSection("region-top-charge")}>
        <img src={station} alt="프로필" className="i-top-img" />
        우리동네 Top5
      </div>
      <div className="i-lowest"onClick={() => scrollToSection("lowest-price")}>
        <img src={sido} alt="프로필" className="i-lowest-img" />
        시도별 최저가
      </div>
    </div>
  );
};

export default MainIcon;
