import React, { useState } from "react";
import "../../static/scss/MyPage/PlaceSearchPopup.scss";

const PlaceSearchPopup = ({ setShowPlaceSearchPopup, setSelectedPlace }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const places = [
    { name: "만수르 주유소", address: "충남 천안시 동남구 122" },
    { name: "쌍용주유소", address: "충남 천안시 동남구 123" },
    { name: "천안주유소", address: "충남 천안시 서북구 124" },
    { name: "시흥주유소", address: "경기 시흥시 125" },
    { name: "가득주유소", address: "서울 강남구 126" },
    { name: "서울주유소", address: "서울 강남구 테헤란로 100" },
    { name: "부산주유소", address: "부산 해운대구 해운대로 50" },
    { name: "대구주유소", address: "대구 중구 동성로 33" },
  ];

  const itemsPerPage = 5; // 페이지당 표시할 항목 수
  const totalPages = Math.ceil(places.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPlaces = places.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="modal">
      <div className="modal-content">
        <button
          className="close-btn"
          onClick={() => setShowPlaceSearchPopup(false)}
        >
          &times;
        </button>
        <h2 style={{textAlign:"center"}}>주유소 선택</h2>
        <div className="search-bar">
          <label style={{display: "inline-block"}}>
            장소명　  
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
          <button className="searchBtn">검색</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>주유소명</th>
              <th>주소</th>
              <th>선택</th>
            </tr>
          </thead>
          <tbody>
            {currentPlaces.map((place, index) => (
              <tr key={index}>
                <td>{place.name}</td>
                <td>{place.address}</td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedPlace(place.name);
                      setShowPlaceSearchPopup(false);
                    }}
                  >
                    선택
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceSearchPopup;
