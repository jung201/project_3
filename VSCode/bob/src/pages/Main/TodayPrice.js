import React from "react";

const TodayPrice = () => {
  return (
    <div className="price-container">
      <h2>오늘의 유가</h2>
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
  );
};

export default TodayPrice;
