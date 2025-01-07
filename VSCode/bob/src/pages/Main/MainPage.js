import React from "react";
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
      <div className="main-icon"></div>
      <section className="today-price-section">
        {/* 오늘의 유가 */}
        <TodayPrice />
        {/* 유가 추이 */}
        <OilTrend />
      </section>

      {/* 지역 별 Top5 주유소 */}
      <section className="region-top-section">
        <div className="region-top">
          {/* 우리지역 Top5 주유소 */}
          <RegionTopCharge />
          {/* 시도 별 최저가 주유소 */}
          <LowestPrice />
        </div>
      </section>
    </main>
  );
};

export default MainPage;
