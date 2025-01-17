import React, { useRef,useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaMotorcycle,FaCheckCircle } from 'react-icons/fa';
import { MdAddToPhotos } from "react-icons/md";
import PrivacyModal from './PrivacyModal';
import '../../static/scss/Login/SignupForm.scss';
import { checkIdDuplicate, registerUser } from '../../service/apiService';
import { validateField } from './SignupFunction';

function SignupForm() {
  const initialFormData = {
    id: '',
    pw: '',
    pwcheck: '',
    nickname: '',
    phone1: '',
    phone2: '',
    phone3: '',
    email: '',
    type: '',
    photo: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [selectedFileName, setSelectedFileName] = useState('');
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isPrivacyAgreed, setIsPrivacyAgreed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 각 입력 필드 참조
  const phone2Ref = useRef(null);
  const phone3Ref = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    if (['phone1', 'phone2', 'phone3'].includes(name)) { // 특정 필드에서만 숫자만 허용
      sanitizedValue = value.replace(/\D/g, '');// 숫자 외 문자 제거
    }
    
    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, sanitizedValue, formData) }));

    if (name === 'id'){
      setIsIdChecked(false);
    }
    
    if (name === 'phone1' && value.length === 3) {
      phone2Ref.current?.focus();
    } else if (name === 'phone2' && value.length === 4) {
      phone3Ref.current?.focus();
    }
  };

  //아이디 중복 확인
  const handleCheckId = async () => {
    const error = validateField('id', formData.id);
    if (error) return setErrors((prev) => ({ ...prev, id: error }));
    try {
      const isDuplicate = await checkIdDuplicate(formData.id); // API 호출
      setIsIdChecked(!isDuplicate);
      alert(isDuplicate ? '이미 사용 중인 아이디입니다.' : '사용 가능한 아이디입니다.');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file?.size > 5 * 1024 * 1024) return alert('파일 크기는 5MB 이하여야 합니다.');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    setFormData((prev) => ({ ...prev, photo: file }));
    setSelectedFileName(file ? file.name : '');
  };

  

  //모달 관련
  const handlePrivacyAgree = () => {
    setIsPrivacyAgreed(true); // 개인정보 동의
    setShowModal(false); // 모달 닫기
  };

  const handlePrivacyDecline = () => {
    setIsPrivacyAgreed(false); // 개인정보 비동의
    setShowModal(false); // 모달 닫기
  };

  //중복 요청 방지
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isSubmitting) return; // 중복 요청 방지
    if (!isIdChecked) return alert('아이디 중복 체크를 해주세요.');
    if (!isPrivacyAgreed) return alert('개인정보 수집 및 활용에 동의해주세요.');
  
    const newErrors = Object.keys(formData).reduce((acc, key) => {
      const error = validateField(key, formData[key], formData);
      if (error) acc[key] = error;
      return acc;
    }, {});
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    setIsSubmitting(true); // 로딩 상태 시작
    try {
      const result = await registerUser(formData);
      alert(result);
      setFormData(initialFormData);
      setErrors({});
      setIsIdChecked(false);
    } catch {
      alert('회원가입 처리 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false); // 로딩 상태 종료
    }
  };

  return (
    <div className='SignupForm'>
      <div className="signup-container">
        <h1>회원가입</h1>
        <form onSubmit={handleSubmit}>
          {[
            { name: 'id', placeholder: '아이디 입력 (8자 이상)', icon: <FaUser size={20} />, button: '중복확인', onClick: handleCheckId },
            { name: 'pw', placeholder: '비밀번호 입력 (8자 이상)', icon: <FaLock />,type: 'password' },
            { name: 'pwcheck', placeholder: '비밀번호 확인', icon: <FaCheckCircle />,type: 'password' },
            { name: 'nickname', placeholder: '닉네임 입력 (2자 이상)', icon: <FaUser /> },
            { name: 'email', placeholder: '이메일 입력', icon: <FaEnvelope /> },
          ].map(({ name, placeholder, icon, button, onClick,type ='text' }) => (
            <div key={name} className="input-group">
              {icon}
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                className={`input-field ${errors[name] ? 'error' : ''}`}
              />
              {button && <button type="button" onClick={onClick} className="check-button">{button}</button>}
              {errors[name] && <div className="error-message">{errors[name]}</div>}
            </div>
          ))}

          <div className="phone-group">
              <FaPhone size={20} className="input-icon" />
              <select 
                name="phone1" 
                value={formData.phone1} 
                onChange={handleChange}
                className="select-field"  
              >
                <option value="">선택</option>
                <option value="010">010</option>
              </select>
              <input 
                type="text" 
                name="phone2" 
                placeholder="0000" 
                value={formData.phone2} 
                onChange={handleChange}
                ref={phone2Ref} 
                maxLength="4" 
                className="input-field"  
              />
              <input 
                type="text" 
                name="phone3" 
                placeholder="0000" 
                value={formData.phone3} 
                onChange={handleChange}
                ref={phone3Ref} 
                maxLength="4" 
                className="input-field" 
              />
          </div>

          <div className='input-group'>
            <FaMotorcycle className="input-icon" />
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`select-field ${errors.type ? 'error' : ''}`}
            >
              <option value="">배기량을 선택해주세요</option>
              <option value="50cc">50cc이하</option>
              <option value="125cc">125cc이하</option>
              <option value="250cc">250cc이하(쿼터급)</option>
              <option value="500cc">500cc(미들급)</option>
              <option value="1000cc">1000cc(리터급)</option>
            </select>
            {errors.type && <div className="error-message">{errors.type}</div>}
          </div>

          <div className="photo-upload-container">
            <MdAddToPhotos className="input-icon" />
            <input type="file" name="photo" onChange={handleImageChange} accept="image/*" className="file-input"/>
            {selectedFileName && (
              <div className="file-name">
                선택된 파일: <strong>{selectedFileName}</strong>
              </div>
            )}
          </div>

          <div className="privacy-agreement">
            <input type="checkbox" checked={isPrivacyAgreed} onChange={() => setShowModal(true)} />
            <label>개인정보 수집 및 활용 동의</label>
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? '회원가입 중...' : '회원가입'}
            </button>
        </form>
      </div>
      {showModal && (
        <PrivacyModal
          onClose={handlePrivacyDecline}
          onAgree={handlePrivacyAgree}
        />
      )}
    </div>
  );
}

export default SignupForm;
