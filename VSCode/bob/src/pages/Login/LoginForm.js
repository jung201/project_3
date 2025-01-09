import React, { useState } from 'react';
import axios from 'axios';
import "../../static/scss/Login/LoginForm.scss";
import { Link } from 'react-router-dom';

function LoginForm() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // 임의의 사용자 데이터
  const users = [
    { userId: 'testuser', password: '123456' },
    { userId: 'admin', password: 'admin' },
    { userId: 'guest', password: 'guestpass' },
  ];

  const handleSubmit = async(event) => {
    event.preventDefault();

    try {
      // 백엔드 API 호출
      const response = await axios.post('http://192.168.0.93:3006/login', {
        u_ID: userId,
        u_PWD: password,
      });

      // 성공 응답 처리
      alert(`로그인 성공! 환영합니다, ${response.data.u_NICKNAME}`);
      window.location.href = '/'; // 메인 페이지로 리디렉션
    } catch (err) {
      // 오류 응답 처리
      if (err.response && err.response.status === 400) {
        setError('아이디 또는 비밀번호가 잘못되었습니다.');
      } else {
        setError('서버 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className='loginForm'>
    <div className='container'>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder='아이디를 입력하세요'
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='비밀번호를 입력하세요'
            required
          />
        </div>
        <button type="submit">로그인</button>
        {error && <div className="error">{error}</div>}
      </form>
      <div className='links'>
        <Link to="/Signup">회원가입</Link>
        <Link to="/FindId">ID 찾기</Link>
        <Link to="/FindPw">비밀번호 초기화</Link>
      </div>
    </div>
    </div>
  );
}

export default LoginForm;
