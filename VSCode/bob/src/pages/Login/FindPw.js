import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../static/scss/Login/FindAccount.scss';

function FindPassword() {
  const [formData, setFormData] = useState({
    id: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case 'id':
        return !value ? '아이디를 입력해주세요' : '';
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
      alert("임시 비밀번호가 이메일로 전송되었습니다.");
      window.location.href = '/Login';
    } catch (error) {
      setErrors({
        general: '비밀번호 찾기 중 오류가 발생했습니다'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="findAccount">
      <div className="container">
        <h1>비밀번호 찾기</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
              className={errors.id ? 'error' : ''}
              required
            />
            {errors.id && <div className="error-message">{errors.id}</div>}
          </div>

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
            {isLoading ? '처리중...' : '비밀번호 찾기'}
          </button>
          {errors.general && <div className="error-message">{errors.general}</div>}
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