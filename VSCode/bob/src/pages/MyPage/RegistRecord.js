import React, { useState } from "react";
import "../../static/scss/MyPage/RegistRecord.scss";

const RegistRecord = ({ setShowRegistModal, addRecord }) => {
  const [date, setDate] = useState("");
  const [station, setStation] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 동작 방지
    if (!date || !station || !amount) {
      alert("모든 필드를 입력해 주세요!");
      return;
    }

    // 디버깅용 데이터 확인
    console.log("전송 데이터:", {
      uuCoastDate: date,
      uuStation: station,
      uuCoast: parseInt(amount, 10),
    });

    // 새로운 기록 추가
    addRecord({
      uuCoastDate: date,
      uuStation: station,
      uuCoast: parseInt(amount, 10),
    });

    // 입력 필드 초기화
    setDate("");
    setStation("");
    setAmount("");

    // 모달 닫기
    setShowRegistModal(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={() => setShowRegistModal(false)}>
          &times;
        </button>
        <h2 style={{ textAlign: "center" }}>주유기록 등록/수정</h2>
        <form onSubmit={handleSubmit}>
          <label>
            날짜　
            <input
              type="date"
              style={{ width: "94%" }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
          <label>
            장소　
            <input
              type="text"
              placeholder="장소를 입력하세요"
              value={station}
              onChange={(e) => setStation(e.target.value)}
              required
            />
          </label>
          <label>
            금액　
            <input
              type="number"
              placeholder="금액을 입력하세요"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </label>
          <div className="actions">
            <button type="submit">등록완료</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistRecord;
