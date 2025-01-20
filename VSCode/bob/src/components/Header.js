import React, { useState, useEffect } from "react"; // useState와 useEffect 추가
import "../static/scss/header.scss";
import { Link } from "react-router-dom";
import logosample from "../static/images/logo.PNG";
import info from "../static/images/icons/info.png";
import search from "../static/images/icons/search.png";
import riding from "../static/images/icons/riding.png";
import board from "../static/images/icons/board.png";
import mypage from "../static/images/icons/mypage1.png";
import login from "../static/images/icons/login.PNG";
import logout from "../static/images/icons/logout.PNG";
import signin from "../static/images/icons/signin.PNG";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    const storedNickname = sessionStorage.getItem("nickname");

    if (storedUserId) {
      setIsLoggedIn(true);
      setNickname(storedNickname);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear(); // 세션 초기화
    setIsLoggedIn(false);
    alert("로그아웃 되었습니다.");
    window.location.reload(); // 페이지 새로고침
  };

  return (
    <header className="header-container">
      <div className="header-size">
        {/* 메뉴 리스트 */}
        <nav className="nav-menu">
          <ul>
            <li>
              <Link to="/info">주유소정보</Link>
            </li>
            <li>
              <Link to="/MainMapPage">목적지검색</Link>
            </li>
            <li>
              <Link to="/Riding">테마라이딩</Link>
            </li>
            <li>
              <Link to="/board">자유게시판</Link>
            </li>
          </ul>
        </nav>

        {/* 로고 */}
        <div className="logo">
          <a href="/">
            <img src={logosample} alt="로고" style={{ height: "35px" }} />
          </a>
        </div>

        {/* 로그인 상태에 따라 다른 버튼 보여주기 */}
        <div className="auth-buttons">
          {isLoggedIn ? (
            // 로그인 상태일 때
            <>
              <span className="welcome-message">{nickname} 님 환영합니다!</span>
              <button className="logout-button" onClick={handleLogout}>
                <img src={logout} alt="로그아웃" className="button-icon" />
              </button>
              <Link to="/MyPage">
                <button className="mypage-button">
                  <img src={mypage} alt="마이페이지" className="button-icon" />
                </button>
              </Link>
            </>
          ) : (
            // 로그아웃 상태일 때
            <>
              <Link to="/Login">
                <button className="login-button">
                  <img src={login} alt="로그인" />
                </button>
              </Link>
              <Link to="/Signup">
                <button className="signup-button">
                  <img src={signin} alt="회원가입" />
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* 모바일 하단 메뉴 */}
      <div className="mobile-menu">
        <ul>
          <li>
            <Link to="/info">
              <img src={info} alt="정보찾기" />
            </Link>
          </li>
          <li>
            <a href="/MainMapPage">
              <img src={search} alt="목적지" />
            </a>
          </li>
          <li>
            <Link to="/Riding">
              <img src={riding} alt="라이딩" />
            </Link>
          </li>
          <li>
            <Link to="/board">
              <img src={board} alt="게시판" />
            </Link>
          </li>
          <li>
            <a href="/MyPage">
              <img src={mypage} alt="마이페이지" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
