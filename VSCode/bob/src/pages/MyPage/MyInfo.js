import React, { useState, useEffect } from "react";
import { fetchMyPage, fetchRouteHistory } from "../../service/apiService";
import { formatDate } from "../../utils/dateUtils"; // 날짜 포맷 변환 함수 가져오기
import { getCcLabel } from "../../utils/categoryUtils"; // 배기량 변환 함수 가져오기
import "../../static/scss/MyPage/MyInfo.scss";
import sample from "../../static/images/icons/샘플.PNG";
import UserEditPopup from "./UserEditPopup";

const MyInfo = ({ setView }) => {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nickname: "",
    cc: "",
    joinDate: "",
  });

  // 저장한 목적지 리스트
  const [routeHistory, setRouteHistory] = useState([]);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const userId = sessionStorage.getItem("userId");
        if (!userId) {
          console.error("로그인이 필요합니다.");
          return;
        }

        // 백엔드에서 사용자 정보 가져오기
        const data = await fetchMyPage(userId);
        console.log("가져온 사용자 정보:", data); // 디버깅용 로그

        // 날짜 포맷 변환
        const formattedDate = formatDate(data.u_CREATED_DATE);
        const ccLabel = getCcLabel(data.u_CC);

        // 사용자 정보 상태 업데이트
        setUserInfo({
          nickname: data.u_NICKNAME,
          cc: ccLabel,
          joinDate: formattedDate, // 날짜 필드 사용
        });

        // 저장한 목적지 목록 가져오기
        const routeData = await fetchRouteHistory();
        console.log("가져온 목적지 기록:", routeData);
        setRouteHistory(routeData);
      } catch (error) {
        console.error("사용자 정보를 가져오는 중 오류 발생:", error);
      }
    };

    loadUserInfo(); // 컴포넌트 마운트 시 사용자 정보 가져오기
  }, []);

  const handleScroll = (targetId) => {
    // 450px 이하에서만 스크롤 이동
    if (window.innerWidth <= 450) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // 정확한 위치로 이동
        const offsetTop = targetElement.offsetTop - 90; // 제목과 약간의 여백 조정
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="profile">
      <h2>마이페이지</h2>
      {/* 프로필 이미지 */}
      <div className="profile-image">
        <img src={sample} alt="Profile" />
      </div>

      {/* 유저 정보 */}
      <div className="profile-info">
        <h2>{userInfo.nickname}</h2>
        <p>- 배기량: {userInfo.cc}</p>
        <p>- 가입일: {userInfo.joinDate}</p>
      </div>

      {/* 정보 수정 버튼 */}
      <div className="profile-button">
        <button onClick={() => setShowEditPopup(true)}>정보 수정</button>
      </div>
      <br />
      <br />
      <br />
      {/* 메뉴 버튼 */}
      <div className="profile-menu">
        <button
          className="menuBtn"
          onClick={() => {
            setView("stationInfo");
            handleScroll("favoriteSection");
          }}
        >
          나의 주유소 정보
        </button>
        <br />
        <br />
        <button
          className="menuBtn"
          onClick={() => {
            setView("myPosts");
            handleScroll("myPostsSection");
          }}
        >
          내가 쓴 글 보기
        </button>
      </div>
      {showEditPopup && (
        <UserEditPopup
          setShowEditPopup={setShowEditPopup}
          userId={sessionStorage.getItem("userId")} // 세션에서 userId 가져오기
        />
      )}
    </div>
  );
};

export default MyInfo;
