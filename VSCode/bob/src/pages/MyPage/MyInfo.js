import React from "react";
import "../../static/scss/MyPage/MyInfo.scss";
import sample from "../../static/images/icons/샘플.PNG";

const MyInfo = ({ setView }) => {
  return (
    <div className="profile">
      <h2>마이페이지</h2>
      {/* 프로필 이미지 */}
      <div className="profile-image">
        <img src={sample} alt="Profile" />
      </div>

      {/* 유저 정보 */}
      <div className="profile-info">
        <h2>천안라이더</h2>
        <p>- 배기량: 125cc</p>
        <p>- 가입일: 2021. 11. 11</p>
      </div>

      {/* 정보 수정 버튼 */}
      <div className="profile-button">
        <button>정보 수정</button>
      </div>
      <br/><br/><br/>
      {/* 메뉴 버튼 */}
      <div className="profile-menu">
        <button className="menuBtn" onClick={() => setView("stationInfo")}>나의 주유소 정보</button><br/><br/>
        <button className="menuBtn" onClick={() => setView("myPosts")}>내가 쓴 글 보기</button>
      </div>
    </div>
  );
};

export default MyInfo;
