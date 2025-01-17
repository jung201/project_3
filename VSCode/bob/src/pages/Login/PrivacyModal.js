import React, { useState } from 'react';

function PrivacyModal({ onClose, onAgree }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">개인정보 수집 및 활용 동의</h2>
        <div className="modal-body">
          <p><strong>1. 개인정보의 수집 및 이용 목적</strong></p>
          <p>회원 가입 및 관리, 서비스 제공 및 운영, 안내사항 전달</p>
          <p><strong>2. 수집하는 개인정보의 항목</strong></p>
          <p>아이디, 비밀번호, 이름, 전화번호, 이메일, 프로필 사진</p>
          <p><strong>3. 개인정보의 보유 및 이용 기간</strong></p>
          <p>회원 탈퇴 시까지 (단, 관계 법령에 따라 보존할 필요가 있는 경우 해당 기간까지)</p>
        </div>
        <div className="modal-actions">
          <button className="modal-cancel" onClick={onClose}>취소</button>
          <button className="modal-confirm" onClick={onAgree}>동의</button>
        </div>
      </div>
    </div>
  );
}

export default PrivacyModal;