import React from 'react';
import '../static/scss/header.scss';
import { Link } from 'react-router-dom';
import logosample from '../static/images/logo.PNG';
import info from '../static/images/icons/info.png';
import search from '../static/images/icons/search.png';
import riding from '../static/images/icons/riding.png';
import board from '../static/images/icons/board.png';
import mypage from '../static/images/icons/mypage.png';
import login from '../static/images/icons/login.PNG';
import signin from '../static/images/icons/signin.PNG';
import white from '../static/images/logoWhite.PNG'


function Header() {
    return (
        <header className="header-container">
            <div className="header-size">
                {/* 메뉴 리스트 */}
                <nav className="nav-menu">
                    <ul>
                        <li><Link to="/info">주유소정보</Link></li>
                        <li><Link to="/MainMapPage">목적지검색</Link></li>
                        <li><Link to="/Riding">테마라이딩</Link></li>
                        <li><Link to="/board">자유게시판</Link></li>
                    </ul>
                </nav>

                {/* 로고 */}
                <div className="logo">
                    <a href="/">
                        <img src={logosample} alt="로고" style={{ height: "35px" }} />
                    </a>
                </div>


                {/* 로그인 및 회원가입 버튼 */}
                <div className="auth-buttons">
                <Link to="/Login"><button className="login-button"><img src={login}/></button></Link>
                <Link to="/Signup"><button className="signup-button"><img src={signin}/></button></Link>
                </div>
            </div>

            {/* 모바일 하단 메뉴 */}
            <div className="mobile-menu">
                <ul>
                    <li><Link to="/info"><img src={info} alt="정보찾기" /></Link></li>
                    <li><a href="/MainMapPage"><img src={search} alt="목적지" /></a></li>
                    <li><Link to="/Riding"><img src={riding} alt="라이딩" /></Link></li>
                    <li><Link to="/board"><img src={board} alt="게시판" /></Link></li>
                    <li><a href="/MyPage"><img src={mypage} alt="마이페이지" /></a></li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
