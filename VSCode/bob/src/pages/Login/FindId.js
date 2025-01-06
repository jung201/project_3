import React, { useState } from 'react';
import './FindId.css';
// import findPw from './FindPw.js'
import { Link } from 'react-router-dom';

function FindId() {
  // 사용자 입력값 저장 로직
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  // 상태 관리
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [foundId, setFoundId] = useState(null);

  // 개별 필드 유효성 검사
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value) {
          return '이름을 입력해주세요';
        }
        break;
      case 'email':
        if (!value) {
          return '이메일을 입력해주세요';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return '올바른 이메일 형식이 아닙니다';
        }
        break;
      default:
        return '';
    }
    return '';
  };

  // 입력값 변경 처리
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // 아이디 찾기 처리
  const handleFindId = async (event) => {
    event.preventDefault();

    // 전체 유효성 검사
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      // 실제 API 호출로 대체 필요
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 임시로 아이디를 반환 (이메일과 이름에 해당하는 아이디를 찾는 로직 추가 필요)
      setFoundId('user123'); // 여기서 'user123'은 실제로 서버에서 반환받은 아이디여야 합니다.
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: '아이디 찾기 중 오류가 발생했습니다',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="find-id-container">
      <h1>아이디 찾기</h1>
      {foundId && (
        <div className="found-id-message">
          <strong>찾은 아이디: </strong>{foundId}
        </div>
      )}
      {errors.general && (
        <div className="error-message">{errors.general}</div>
      )}

      <form onSubmit={handleFindId} className="space-y-4">
        <div>
          <label htmlFor="name">이름</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="이름 입력"
            value={formData.name}
            onChange={handleChange}
            className={`input-field ${errors.name ? 'error' : ''}`}
            aria-describedby="name-error"
          />
          {errors.name && <div id="name-error" className="error-message">{errors.name}</div>}
        </div>

        <div>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="이메일 입력"
            value={formData.email}
            onChange={handleChange}
            className={`input-field ${errors.email ? 'error' : ''}`}
            aria-describedby="email-error"
          />
          {errors.email && <div id="email-error" className="error-message">{errors.email}</div>}
        </div>

        <div className="button-group">
          <button
            type="submit"
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? '처리중...' : '아이디 찾기'}
          </button>
        </div>
      </form>
      <div className="links">
        <a href='#' className="link-button">비밀번호 찾기</a>
      </div>
    </div>
  );
}

export default FindId;
