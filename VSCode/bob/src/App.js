import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header'; // 공통 헤더
import AppRouter from './router/Router'; // 라우팅 관리 파일 불러오기

function App() {
  return (
    <Router>
      <div>
        {/* 공통 헤더 컴포넌트 */}
        <Header />
        {/* 메인 페이지 내용 */}
        <main>
          <AppRouter /> {/* Router.js에 정의된 라우팅을 불러옴 */}
        </main>
      </div>
    </Router>
  );
}

export default App;
