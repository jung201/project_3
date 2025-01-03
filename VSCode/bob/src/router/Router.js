import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/Main/MainPage'; // 메인 페이지
// import Login from '../pages/Login/Login'; // 로그인 페이지
import Board from '../pages/Board/Board'; // 보드 페이지
import Info from '../pages/Info/InfoPage'; // 정보 페이지
import MyPage from '../pages/MyPage/MyPage'; // 마이 페이지
import MainMapPage from '../pages/Search/MainMapPage'; // 검색 페이지
import Riding from '../pages/Theme/Riding'; // 테마 페이지?
import RDetail from '../pages/Theme/RDetail'; //테마

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} /> {/* 메인 페이지 */}
      {/* <Route path="/login" element={<Login />} /> 로그인 페이지 */}
      <Route path="/board" element={<Board />} /> 게시판 페이지
      <Route path="/info" element={<Info />} /> {/*정보 페이지*/}
      <Route path="/MyPage" element={<MyPage />} /> 마이 페이지
      <Route path="/MainMapPage" element={<MainMapPage />} /> {/*검색 페이지*/}
      <Route path="/Riding" element={<Riding />} /> {/*테마 페이지*/}
      <Route path="/RDetale" element={<RDetail />} /> {/*테마 페이지*/}
    </Routes>
  );
}

export default AppRouter;
