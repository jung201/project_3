import React, { useState } from 'react';
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

  const handleSubmit = (event) => {
    event.preventDefault();

    // 입력값 검증
    const user = users.find(
      (u) => u.userId === userId && u.password === password
    );

    if (user) {
      alert('로그인 완료!');
      window.location.href = '/'; // 성공 시 특정 페이지로 리디렉션
    } else {
      setError('아이디 또는 비밀번호가 잘못되었습니다.');
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
        <Link to="/FindPw">비밀번호 찾기</Link>
      </div>
    </div>
    </div>
  );
}

export default LoginForm;
