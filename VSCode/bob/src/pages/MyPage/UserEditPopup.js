import React, { useState } from "react";
import { updateMyPage } from "../../service/apiService"; // 공통 서비스 함수 불러오기
import "../../static/scss/MyPage/UserEditPopup.scss";

const UserEditPopup = ({ setShowEditPopup, userId}) => {
  console.log("전달된 userId:", userId);
  // 폼 데이터를 관리하기 위한 상태 정의
  const [formData, setFormData] = useState({
    nickname: "",
    type: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    bikeImage: null,
  });

  // 폼 데이터 변경 핸들러
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // 파일 입력일 경우 파일 객체 저장
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 확인 로직 추가
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다 !");
      return;
    }

    try {
      // FormData 객체 생성
      const payload = new FormData();
      payload.append("userId", userId);
      payload.append("nickname", formData.nickname);
      payload.append("type", formData.type);
      payload.append("password", formData.password);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      if (formData.bikeImage) {
        payload.append("bikeImage", formData.bikeImage); // 파일 데이터 추가
      }

      const response = await updateMyPage(userId, payload);
      alert("정보가 성공적으로 수정되었습니다 !");
      console.log("응답 데이터 : ", response);

      setShowEditPopup(false);
    } catch (error) {
      console.error("정보 수정 실패 : ", error);
      alert("정보 수정에 실패했습니다. 다시 시도해 주세요 !");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={() => setShowEditPopup(false)}>
          &times;
        </button>
        <h3>내 정보 수정</h3>
        <form onSubmit={handleSubmit}>
          <label>
            닉네임:
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              autoComplete="username"
            />
          </label>
          <label>
            타입:
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              style={{ width: "100%" }}
            >
              <option value="스쿠터">스쿠터</option>
              <option value="소형">소형</option>
              <option value="중형">중형</option>
              <option value="리터">리터</option>
            </select>
          </label>
          <label>
            비밀번호:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete ="new-password"
            />
          </label>
          <label>
            재확인:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete ="new-password"
            />
          </label>
          <label>
            이메일:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </label>
          <label>
          핸드폰번호:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
            />
          </label>
          <label>
            오토바이사진:
            <input
              type="file"
              name="bikeImage"
              onChange={handleChange}
            />
          </label>
          <button type="submit">수정완료</button>
        </form>
      </div>
    </div>
  );
};

export default UserEditPopup;
