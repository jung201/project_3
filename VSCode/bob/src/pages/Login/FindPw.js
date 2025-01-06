import React, { useState } from 'react';
import './FindPw.css';

function FindPassword() {
  // 사용자 입력값 저장 로직
  const [formData, setFormData] = useState({
    id: '',
    email: '',
  });

  // 상태 관리
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  // 개별 필드 유효성 검사
  const validateField = (name, value) => {
    switch (name) {
      case 'id':
        if (!value) {
          return '아이디를 입력해주세요';
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

  // 비밀번호 찾기 처리
  const handleFindPassword = async (event) => {
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

      // 임시로 비밀번호 발급 (아이디와 이메일에 해당하는 비밀번호를 찾는 로직 추가 필요)
      setSuccessMessage('임시 비밀번호가 발급되었습니다. 이메일을 확인해주세요.'); // 이메일로 실제 임시 비밀번호를 보내는 로직 필요
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: '비밀번호 찾기 중 오류가 발생했습니다',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="find-password-container">
      <h1>비밀번호 찾기</h1>
      {successMessage && (
        <div className="success-message">
          <strong>{successMessage}</strong>
        </div>
      )}
      {errors.general && (
        <div className="error-message">{errors.general}</div>
      )}

      <form onSubmit={handleFindPassword} className="space-y-4">
        <div>
          <label htmlFor="id">아이디</label>
          <input
            id="id"
            type="text"
            name="id"
            placeholder="아이디 입력"
            value={formData.id}
            onChange={handleChange}
            className={`input-field ${errors.id ? 'error' : ''}`}
            aria-describedby="id-error"
          />
          {errors.id && <div id="id-error" className="error-message">{errors.id}</div>}
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
            {isLoading ? '처리중...' : '비밀번호 찾기'}
          </button>
        </div>
      </form>
      <div className="links">
        <a href="/find-id" className="link-button">아이디 찾기</a>
      </div>
    </div>
  );
}

export default FindPassword;
