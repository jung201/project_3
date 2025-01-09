import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../static/scss/Login/FindAccount.scss';

function FindId() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return !value ? '이름을 입력해주세요' : '';
      case 'email':
        return !value 
          ? '이메일을 입력해주세요' 
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? '올바른 이메일 형식이 아닙니다'
          : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      // API 호출 로직 구현 필요
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert("가입하신 아이디를 이메일로 전송했습니다.");
      window.location.href = '/Login';
    } catch (error) {
      setErrors({
        general: '아이디 찾기 중 오류가 발생했습니다'
      });
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
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
              className={errors.email ? 'error' : ''}
              required
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? '처리중...' : '아이디 찾기'}
          </button>
          {errors.general && <div className="error-message">{errors.general}</div>}
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