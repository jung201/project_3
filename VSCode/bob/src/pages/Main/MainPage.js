import React from "react";
import MainIcon from "./MainIcon";
import TodayPrice from "./TodayPrice";
import OilTrend from "./OilTrend";
import LowestPrice from "./LowestPrice";
import RegionTopCharge from "./RegionTopCharge";
import "../../static/scss/MainPage/mainPage.scss";
import SparkleEffect from "../../customHook/SparkleEffect"; // Hook 임포트

const MainPage = () => {
  // 반짝이는 효과 적용
  SparkleEffect();

  return (
    <main className="main-container">
      <div className="main-pic"></div>
      {/* icon */}
      <MainIcon />

      <div className="today-price-section">
        <section id="today-price">
          {/* 오늘의 유가 */}
          <TodayPrice />
        </section>
        <section id="oil-trend">
          {/* 유가 추이 */}
          <OilTrend />
        </section>
      </div>
      
      <div className="region-top-section">
        <section id="region-top-charge">
          <div className="region-top">
            {/* 우리지역 Top5 주유소 */}
            <RegionTopCharge />
          </div>
        </section>
        <section id="lowest-price">
          <div className="region-top">
            {/* 시도 별 최저가 주유소 */}
            <LowestPrice />
          </div>
        </section>
      </div>
    </main>
  );
};

export default MainPage;
