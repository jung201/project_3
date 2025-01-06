import React, { useState, useEffect } from 'react';
import './SignupForm.css';

function SignupForm() {
  // 사용자 입력값 저장 로직
  const [formData, setFormData] = useState({
    id: '',
    idcheck: '',
    pw: '',
    pwcheck: '',
    nickname: '',
    phone1: '',
    phone2: '',
    phone3: '',
    email: '',
    type: '',
    photo: '',
  });

  // 상태 관리
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isPrivacyAgreed, setIsPrivacyAgreed] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const PrivacyModal = ({ onClose, onAgree }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-4">
          <h2 className="text-xl font-bold mb-4">개인정보 수집 및 활용 동의</h2>
          <div className="max-h-60 overflow-y-auto mb-4">
            <p>1. 개인정보의 수집 및 이용 목적</p>
            <p className="mb-2">회원 가입 및 관리, 서비스 제공 및 운영, 안내사항 전달</p>
            
            <p>2. 수집하는 개인정보의 항목</p>
            <p className="mb-2">아이디, 비밀번호, 이름, 전화번호, 이메일, 프로필 사진</p>
            
            <p>3. 개인정보의 보유 및 이용기간</p>
            <p className="mb-2">회원 탈퇴 시까지 (단, 관계 법령에 따라 보존할 필요가 있는 경우 해당 기간까지)</p>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              취소
            </button>
            <button
              onClick={onAgree}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              동의
            </button>
          </div>
        </div>
      </div>
    );
  };

    // 개인정보 동의 체크박스 클릭 핸들러
    const handlePrivacyClick = () => {
      setShowPrivacyModal(true);
    };
  
    // 개인정보 동의 처리
    const handlePrivacyAgree = () => {
      setIsPrivacyAgreed(true);
      setShowPrivacyModal(false);
    };

  // 개별 필드 유효성 검사
  const validateField = (name, value) => {
    switch(name) {
      case 'id':
        if (!value) {
          return '아이디를 입력해주세요';
        } else if (!/^[A-Za-z0-9]{8,}$/.test(value)) {
          return '아이디는 8자 이상의 영문/숫자만 가능합니다';
        }
        break;
      case 'pw':
        if (!value) {
          return '비밀번호를 입력해주세요';
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value)) {
          return '비밀번호는 8자 이상, 영문/숫자/특수문자를 포함해야 합니다';
        }
        break;
      case 'pwcheck':
        if (value !== formData.pw) {
          return '비밀번호가 일치하지 않습니다';
        }
        break;
      case 'nickname':
        if (!value) {
          return '닉네임을 입력해주세요';
        } else if (value.length < 2) {
          return '닉네임은 2자 이상이어야 합니다';
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

  // ID 중복 체크
  const checkIdDuplicate = async () => {
    if (!formData.id) {
      setErrors(prev => ({ ...prev, id: '아이디를 입력해주세요' }));
      return;
    }

    const error = validateField('id', formData.id);
    if (error) {
      setErrors(prev => ({ ...prev, id: error }));
      return;
    }

    setIsLoading(true);
    try {
      // 실제 API 호출로 대체 필요
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsIdChecked(true);
      alert('사용 가능한 아이디입니다.');
    } catch (error) {
      setErrors(prev => ({ ...prev, id: '아이디 중복 체크 중 오류가 발생했습니다' }));
    } finally {
      setIsLoading(false);
    }
  };

  // 이미지 처리
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB 제한
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData(prev => ({ ...prev, photo: file }));
    }
  };

  // 입력값 변경 처리
  const handleChange = (event) => {
    const { name, value } = event.target;
    
    if (name === 'id') {
      setIsIdChecked(false);
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // 폼 제출 처리
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!isIdChecked) {
      alert('아이디 중복 체크를 해주세요.');
      return;
    }

    if (!isPrivacyAgreed) {
      alert('개인정보 수집 및 활용에 동의해주세요.');
      return;
    }
    // 전체 유효성 검사
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
      // 실제 API 호출로 대체 필요
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('회원가입이 완료되었습니다!');
      resetForm();
    } catch (error) {
      alert('회원가입 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 폼 초기화
  const resetForm = () => {
    setFormData({
      id: '',
      idcheck: '',
      pw: '',
      pwcheck: '',
      nickname: '',
      phone1: '',
      phone2: '',
      phone3: '',
      email: '',
      type: '',
      photo: '',
    });
    setErrors({});
    setImagePreview(null);
    setIsIdChecked(false);
  };

  // 새로고침 경고
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (Object.values(formData).some(value => value)) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [formData]);

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="id">아이디 입력</label>
          <div className="id-check-group">
            <input
              id="id"
              type="text"
              name="id"
              placeholder="아이디 입력 (8자 이상)"
              value={formData.id}
              onChange={handleChange}
              maxLength={20}
              className={`input-field ${errors.id ? 'error' : ''}`}
              aria-describedby="id-error"
            />
            <button
              type="button"
              onClick={checkIdDuplicate}
              disabled={isLoading || !formData.id}
              className="check-button"
            >
              중복확인
            </button>
          </div>
          {errors.id && <div id="id-error" className="error-message">{errors.id}</div>}
        </div>

        <div>
          <label htmlFor="pw">비밀번호 입력</label>
          <div className="password-field">
            <input
              id="pw"
              type={showPassword ? "text" : "password"}
              name="pw"
              placeholder="비밀번호 입력 (8자 이상)"
              value={formData.pw}
              onChange={handleChange}
              maxLength={20}
              className={`input-field ${errors.pw ? 'error' : ''}`}
              aria-describedby="pw-error"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
            >
              {showPassword ? '숨기기' : '보기'}
            </button>
          </div>
          {errors.pw && <div id="pw-error" className="error-message">{errors.pw}</div>}
        </div>

        <div>
          <label htmlFor="pwcheck">비밀번호 확인</label>
          <div className="password-field">
            <input
              id="pwcheck"
              type={showPasswordCheck ? "text" : "password"}
              name="pwcheck"
              placeholder="비밀번호 확인"
              value={formData.pwcheck}
              onChange={handleChange}
              maxLength={20}
              className={`input-field ${errors.pwcheck ? 'error' : ''}`}
              aria-describedby="pwcheck-error"
            />
            <button
              type="button"
              onClick={() => setShowPasswordCheck(!showPasswordCheck)}
              className="password-toggle"
            >
              {showPasswordCheck ? '숨기기' : '보기'}
            </button>
          </div>
          {errors.pwcheck && <div id="pwcheck-error" className="error-message">{errors.pwcheck}</div>}
        </div>

        <div>
          <label htmlFor="nickname">닉네임</label>
          <input
            id="nickname"
            type="text"
            name="nickname"
            placeholder="닉네임 입력 (2자 이상)"
            value={formData.nickname}
            onChange={handleChange}
            maxLength={10}
            className={`input-field ${errors.nickname ? 'error' : ''}`}
            aria-describedby="nickname-error"
          />
          {errors.nickname && <div id="nickname-error" className="error-message">{errors.nickname}</div>}
        </div>

        <div>
          <label htmlFor="phone1">전화번호</label>
          <div className="phone-group">
            <select
              id="phone1"
              name="phone1"
              value={formData.phone1}
              onChange={handleChange}
              className={`select-field ${errors.phone ? 'error' : ''}`}
            >
              <option value="">선택</option>
              <option value="010">010</option>
              <option value="011">011</option>
            </select>
            <span className="tel_dot">-</span>
            <input
              type="text"
              name="phone2"
              placeholder="0000"
              value={formData.phone2}
              onChange={handleChange}
              maxLength={4}
              className={`input-field ${errors.phone ? 'error' : ''}`}
            />
            <span className="tel_dot">-</span>
            <input
              type="text"
              name="phone3"
              placeholder="0000"
              value={formData.phone3}
              onChange={handleChange}
              maxLength={4}
              className={`input-field ${errors.phone ? 'error' : ''}`}
            />
          </div>
          {errors.phone && <div className="error-message">{errors.phone}</div>}
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

        <div>
          <label htmlFor="type">배기량 선택</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={`select-field ${errors.type ? 'error' : ''}`}
          >
            <option value="">배기량 선택</option>
            <option value="500cc">500cc</option>
            <option value="1000cc">1000cc</option>
            <option value="1500cc">1500cc</option>
          </select>
          {errors.type && <div className="error-message">{errors.type}</div>}
        </div>

        <div>
          <label htmlFor="photo">프로필 사진</label>
          <div className="photo-upload-container">
            <input
              id="photo"
              type="file"
              name="photo"
              onChange={handleImageChange}
              accept="image/*"
              className="file-input"
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="프로필 미리보기" />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 border p-3 rounded">
          <input
            type="checkbox"
            id="privacy"
            checked={isPrivacyAgreed}
            onChange={handlePrivacyClick}
            className="w-4 h-4"
          />
          <label htmlFor="privacy" className="flex-1">
            개인정보 수집 및 활용 동의
          </label>
        </div>
        <div className="button-group">
          <button
            type="submit"
            disabled={isLoading || !isPrivacyAgreed}
            className="submit-button w-full"
          >
            {isLoading ? '처리중...' : '회원가입'}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="reset-button"
          >
            초기화
          </button>
        </div>
      </form>
      {showPrivacyModal && (
        <PrivacyModal
          onClose={() => setShowPrivacyModal(false)}
          onAgree={handlePrivacyAgree}
        />
      )}
    </div>
  );
}

export default SignupForm;