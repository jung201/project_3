import React from "react";
import "../../static/scss/MyPage/UserEditPopup.scss";

const UserEditPopup = ({ setShowEditPopup }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button
          className="close-btn"
          onClick={() => setShowEditPopup(false)}
        >
          &times;
        </button>
        <h3>내 정보 수정</h3>
        <form>
          <label>
            닉네임:
            <input type="text" name="nickname" />
          </label>
          <label>
            타입:
            <select name="type" style={{width:"100%"}}>
              <option value="스쿠터">스쿠터</option>
              <option value="스포츠">스포츠</option>
              <option value="크루저">크루저</option>
            </select>
          </label>
          <label>
            비밀번호:
            <input type="password" name="password" />
          </label>
          <label>
            재확인:
            <input type="password" name="confirmPassword" />
          </label>
          <label>
            이메일:
            <input type="email" name="email" />
          </label>
          <label>
            핸드폰번호:
            <input type="tel" name="phone" />
          </label>
          <label>
            오토바이사진:
            <input type="file" name="bikeImage" />
          </label>
          <button type="submit">수정완료</button>
        </form>
      </div>
    </div>
  );
};

export default UserEditPopup;
