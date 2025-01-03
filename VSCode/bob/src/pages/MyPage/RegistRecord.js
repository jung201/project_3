import React, { useState } from "react";
import PlaceSearchPopup from "./PlaceSearchPopup";
import "../../static/scss/MyPage/RegistRecord.scss";

const RegistRecord = ({ setShowRegistModal }) => {
  const [showPlaceSearchPopup, setShowPlaceSearchPopup] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState("");

  return (
    <div className="modal">
      <div className="modal-content">
        <button
          className="close-btn"
          onClick={() => setShowRegistModal(false)}
        >
          &times;
        </button>
        <h3>주유기록 등록/수정</h3>
        <form>
          <label>
            날짜:
            <input type="date" />
          </label>
          <label>
            장소:
            <input
              type="text"
              value={selectedPlace}
              readOnly
              placeholder="장소를 선택해주세요"
            />
            <button
              type="button"
              onClick={() => setShowPlaceSearchPopup(true)}
            >
              장소찾기
            </button>
          </label>
          <label>
            금액:
            <input type="number" />
          </label>
          <div className="actions">
            <button type="submit">등록완료</button>
          </div>
        </form>
      </div>

      {showPlaceSearchPopup && (
        <PlaceSearchPopup
          setShowPlaceSearchPopup={setShowPlaceSearchPopup}
          setSelectedPlace={setSelectedPlace}
        />
      )}
    </div>
  );
};

export default RegistRecord;
