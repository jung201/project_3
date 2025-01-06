import React, { useState } from 'react';
import "./LoginForm.css";

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
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">아이디:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">로그인</button>
        {error && <div className="error">{error}</div>}
      </form>
      <div>
        <a href="/Register">회원가입</a> |<a href="/findId">아이디 찾기</a> |<a href="/findPassword">비밀번호 찾기</a>
      </div>
    </div>
  );
}

export default LoginForm;
