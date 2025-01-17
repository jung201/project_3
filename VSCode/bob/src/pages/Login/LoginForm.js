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
      const userData = await fetchLogin(userId, password);
      alert(`${userData.u_NICKNAME}님 환영합니다!`);
      sessionStorage.setItem('userId', userData.u_ID);
      sessionStorage.setItem('nickname', userData.u_NICKNAME);
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
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
