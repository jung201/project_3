import React from "react";

const TodayPrice = () => {
  return (
    <div className="price-container">
      {/* <div className="font">
        <strong>기름값 아끼는 지름길</strong><br></br>
        <span>밥줘가 있습니다</span>
      </div> */}
      <div className="price-box1">
        <div className="box-title">오늘의 유가</div>
        <div className="price-box">
          <h3>전국 평균</h3>
          <p className="price">
            <span className="value">1654.47</span>{" "}
            <span className="change">▲1.26</span>
            <p className="details">최저가: 1554 | 최고가: 2871</p>
          </p>
        </div>
        <div className="price-box">
          <h3>충남 평균</h3>
          <p className="price">
            <span className="value">1657.89</span>{" "}
            <span className="change">▲1.26</span>
            <p className="details">최저가: 1575 | 최고가: 1898</p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodayPrice;
