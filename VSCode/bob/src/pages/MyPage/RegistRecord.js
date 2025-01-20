import React, { useState, useEffect } from "react";
import "../../static/scss/MyPage/RegistRecord.scss";

const RegistRecord = ({ setShowRegistModal, addRecord, editRecord  }) => {
  // editRecord가 있으면 기본값으로 설정
  const [uuCoastDate, setUuCoastDate] = useState(editRecord?.uuCoastDate || "");
  const [uuStation, setUuStation] = useState(editRecord?.uuStation || "");
  const [uuCoast, setUuCoast] = useState(editRecord?.uuCoast || "");


  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 동작 방지
    if (!uuCoastDate || !uuStation || !uuCoast) {
      alert("모든 필드를 입력해 주세요!");
      return;
    }

    // 새로운 기록 추가
    addRecord({
      uuCoastDate,
      uuStation,
      uuCoast: parseInt(uuCoast, 10),
      uuId: editRecord?.uuId || null, // 수정 시 ID 포함
    });

    // 입력 필드 초기화
    setUuCoastDate("");
    setUuStation("");
    setUuCoast("");

    // 모달 닫기
    setShowRegistModal(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={() => setShowRegistModal(false)}>
          &times;
        </button>
        <h2 style={{ textAlign: "center" }}>
          {editRecord  ? "주유기록 수정" : "주유기록 등록"}
        </h2>
        <form onSubmit={handleSubmit}>
          <label>
            날짜　
            <input
              type="date"
              style={{ width: "94%" }}
              value={uuCoastDate}
              onChange={(e) => setUuCoastDate(e.target.value)}
              required
            />
          </label>
          <label>
            장소　
            <input
              type="text"
              placeholder="장소를 입력하세요"
              value={uuStation}
              onChange={(e) => setUuStation(e.target.value)}
              required
            />
          </label>
          <label>
            금액　
            <input
              type="number"
              placeholder="금액을 입력하세요"
              value={uuCoast}
              onChange={(e) => setUuCoast(e.target.value)}
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
