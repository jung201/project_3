import React, { useState } from 'react';
import { fetchLogin } from '../../service/apiService';
import "../../static/scss/Login/LoginForm.scss";
import { Link } from 'react-router-dom';

function LoginForm() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await fetchLogin(userId, password);
      alert("로그인 성공! 환영합니다!:");
      window.location.href = "/";
    } catch (err) {
      console.error("로그인 실패:", err);
      setError("로그인 실패: 아이디 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className='loginForm'>
      <div className='container'>
        <h1>로그인</h1>
        <form onSubmit={handleLogin}>
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
