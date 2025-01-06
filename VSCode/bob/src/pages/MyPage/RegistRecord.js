import React, { useState } from "react";
import PlaceSearchPopup from "./PlaceSearchPopup";
import "../../static/scss/MyPage/RegistRecord.scss";
import search from "../../static/images/icons/searchBTN.png"
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
        <h2 style={{textAlign:"center"}}>주유기록 등록/수정</h2>
        <form>
          <label>
            날짜　
            <input type="date" style={{width:"94%"}}/>
          </label>
          <label>
            장소　
            <input
              type="text"
              value={selectedPlace}
              readOnly              
              placeholder="장소를 선택하세요"
              onClick={() => setShowPlaceSearchPopup(true)}
            />
          </label>
          <label>
            금액　
            <input type="number" placeholder="금액을 입력하세요"/>
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
