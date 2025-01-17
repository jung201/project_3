import React, { useState } from "react";
import MyInfo from "./MyInfo";
import SaveDest from "./SaveDest";
import Favorite from "./Favorite";
import Records from "./Records";
import MyPosts from "./MyPosts";
import RegistRecord from "./RegistRecord";
import PlaceSearchPopup from "./PlaceSearchPopup";
import "../../static/scss/MyPage/MyPage.scss";

const MyPage = () => {
  const [view, setView] = useState("stationInfo"); // Default view: "stationInfo"
  const [showRegistModal, setShowRegistModal] = useState(false); // RegistRecord 모달 상태
  const [showPlaceSearchPopup, setShowPlaceSearchPopup] = useState(false); // PlaceSearchPopup 모달 상태

  return (
    <div className="my-page">
      {/* Left Section */}
      <div className="left-section">
        <MyInfo setView={setView} />
      </div>

      {/* Conditional rendering based on selected view */}
      {view === "stationInfo" ? (
        <div className="main-content">
          {/* Middle Section */}
          <div className="middle-section">
            <div className="middle-top-section" id="favoriteSection">
              <Favorite />
            </div>
            <div className="middle-bottom-section">
              <SaveDest />
            </div>
          </div>

          {/* Right Section */}
          <div className="right-section">
            <Records setShowRegistModal={setShowRegistModal} />
          </div>
        </div>
      ) : view === "myPosts" ? (
        <div className="main-content full-width"  id="myPostsSection">
          <MyPosts />
        </div>
      ) : null}

      {/* RegistRecord 모달 */}
      {showRegistModal && (
        <RegistRecord
          setShowRegistModal={setShowRegistModal}
          setShowPlaceSearchPopup={setShowPlaceSearchPopup}
        />
      )}

      {/* PlaceSearchPopup 모달 */}
      {showPlaceSearchPopup && (
        <PlaceSearchPopup setShowPlaceSearchPopup={setShowPlaceSearchPopup} />
      )}
    </div>
  );
};

export default MyPage;
