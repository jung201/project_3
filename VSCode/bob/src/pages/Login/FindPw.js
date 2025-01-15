import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../static/scss/Login/FindAccount.scss';
import { ForgotPassword } from '../../service/apiService';

function FindPassword() {
  const [formData, setFormData] = useState({ id: '', email: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await ForgotPassword.resetPassword(formData.id, formData.email);
      alert(result); // 서버에서 반환된 메시지
      setFormData({ id: '', email: '' });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="findAccount">
      <div className="container">
        <h1>비밀번호 초기화</h1>
            <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="id"
              placeholder="아이디"
              value={formData.id}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="이메일"
              value={formData.email}
              onChange={handleChange}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? '처리 중...' : '비밀번호 초기화'}
            </button>
            {error && <p>{error}</p>}
          </form>
        <div className="links">
          <Link to="/Login">로그인페이지 이동</Link>
          <Link to="/FindId">ID 찾기</Link>
        </div>
      </div>
    </div>
  );
}

export default FindPassword;