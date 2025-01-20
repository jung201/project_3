import React from "react";
import "../../static/scss/MyPage/Favorite.scss";
import ing from "../../static/images/service.png"

const Favorite = () => {
  return (
    <div className="favorite-gas-station">
      <h3>나의 관심 주유소</h3>
      <div className="service-message">
        <img src={ing} style={{
          width:"300px", 
          paddingLeft:"40px",          
          }}/>
      </div>
    </div>
  );
};

export default Favorite;
