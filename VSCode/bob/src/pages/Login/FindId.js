import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../static/scss/Login/FindAccount.scss';
import { ForgotId } from '../../service/apiService';

function FindId() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await ForgotId.findIdByEmail(email);
      alert(`가입된 아이디는 ${result.u_id}입니다.`);
      setEmail(''); // 입력 초기화
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="findAccount">
      <div className="container">
      <h1>아이디 찾기</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="이메일 입력"
            required
          />
          {error && <p className="error-message">{error}</p>}
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? '처리 중...' : '아이디 찾기'}
        </button>
      </form>
        <div className="links">
          <Link to="/Login">로그인페이지 이동</Link>
          <Link to="/FindPw">비밀번호 초기화</Link>
        </div>
      </div>
    </div>
  );
}

export default FindId;