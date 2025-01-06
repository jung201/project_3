import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../static/scss/Board/board.scss";
import SparkleEffect from "../../customHook/SparkleEffect"; // Hook 임포트
// import tinymce from "tinymce/tinymce";
// import "tinymce/themes/silver";
// import "tinymce/icons/default";


// 상태 변수 관리
const Board = () => {

  // 반짝이는 효과 적용
  SparkleEffect();

  const [posts, setPosts] = useState([]); // 게시글 목록 상태
  const [showPopup, setShowPopup] = useState(false); // 팝업 상태
  const [popupType, setPopupType] = useState(""); // 팝업 타입 (등록, 보기)
  const [currentPost, setCurrentPost] = useState(null); // 선택된 게시글 정보
  const [isAnimating, setIsAnimating] = useState(false); // 팝업 애니메이션 상태
  const [selectedCategory, setSelectedCategory] = useState("전체"); // 선택된 카테고리

  // 사용자 입력 상태 관리
  const [title, setTitle] = useState(""); // 제목 상태
  const [category, setCategory] = useState("정비"); // 카테고리 상태
  const [content, setContent] = useState(""); // 내용 상태
  // const [createdId, setCreatedId] = useState("");

  // 정렬 기준과 순서 상태 추가
  const [sortColumn, setSortColumn] = useState(""); // 정렬 기준
  const [sortOrder, setSortOrder] = useState("asc"); // 정렬 순서(오름차순)

  // 검색어
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 상태
  const [searchColumn, setSearchColumn] = useState("B_CATEGORY"); // 검색 기준

  // 로그인 사용자 정보 가져오기 (로그인 시 저장된 ID 사용)
  const userId = localStorage.getItem("userId"); // localStorage에서 사용자 ID 가져오기

  //======================================================================= 

  // 백엔드에서 데이터 불러오기
  useEffect(() => {
    axios
      .get("http://192.168.0.93:3006/api") // API 경로
      .then((response) => {
        console.log(response.data); // 데이터 출력 확인
        setPosts(response.data); // 게시글 데이터 설정
      })
      .catch((error) => {
        console.error("게시글 불러오기 에러:", error);
      });
  }, []);

  //=======================================================================

  // 테이블 렌더링
  const renderTable = () =>
    posts
      .filter((post) => selectedCategory === "전체" || renderCategory(post.b_CATEGORY) === selectedCategory) // 필터링 조건 추가
      .map((post, index) => {
        return (
          <tr key={post.B_ID || index} onClick={() => togglePopup("view", post)}>
            <td>{post.b_ID}</td>
            <td>{renderCategory(post.b_CATEGORY)}</td>
            <td>{post.b_TITLE}</td>
            <td>{post.b_CREATED_ID}</td>
            <td>{post.b_VIEWS}</td>
            <td>{post.b_CREATED_DATE ? new Date(post.b_CREATED_DATE).toLocaleDateString("ko-KR") : "미정"}</td>
          </tr>
        );
      });

  // 테이블 렌더링 - 구분 
  const renderCategory = (code) => {
    const categories = {
      "R": "정비",
      "T": "꿀팁",
      "C": "코스",
      "F": "자유이야기",
    };
    return categories[code] || "기타";
  };

  //=======================================================================

  // 카테고리별 필터링 함수
  const filterPosts = (category) => {
    setSelectedCategory(category); // 선택된 카테고리 상태 업데이트

    // API 요청 보내기
    axios
      .get(`http://192.168.0.93:3006/api?category=${category === "전체" ? "" : category}`) // 전체일 경우 빈 문자열 처리
      .then((response) => {
        setPosts(response.data); // 필터링된 데이터 적용
      })
      .catch((error) => {
        console.error("게시글 필터링 에러:", error);
      });
  };

  //=======================================================================

  // 정렬 함수
  const handleSort = (column) => {
    const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc"; // 정렬 순서 토글
    setSortColumn(column); // 클릭한 열을 기준으로 설정
    setSortOrder(order); // 정렬 순서 설정

    // 정렬 로직
    const sortedPosts = [...posts].sort((a, b) => {
      let aValue = column === "b_CREATED_DATE" ? new Date(a[column]) : a[column];
      let bValue = column === "b_CREATED_DATE" ? new Date(b[column]) : b[column];

      // 비교 및 정렬
      if (aValue < bValue) return order === "asc" ? -1 : 1;
      if (aValue > bValue) return order === "asc" ? 1 : -1;
      return 0;
    });

    setPosts(sortedPosts); // 정렬된 데이터 적용
  };

  //=======================================================================

  // 검색 기능
  const handleSearch = () => {
    // 검색어 유효성 검사
    if (!searchKeyword.trim()) {
      alert("검색어를 입력해주세요!");
      return;
    }

    // 카테고리 한글명 → 코드 변환
    const keyword = searchColumn === "B_CATEGORY" ? convertCategory(searchKeyword.trim()) : searchKeyword.trim();
    // 검색 컬럼과 키워드 설정, 선택한 컬럼명을 대문자로 변환
    const column = searchColumn.toUpperCase();

    // API 호출로 검색어 조회
    axios
      .get(`http://192.168.0.93:3006/api/search`, {
        params: { column, keyword }, // 선택한 컬럼과 키워드 전달
      })
      .then((response) => {
        setPosts(response.data); // 검색 결과 반영
      })
      .catch((error) => {
        console.error("검색 실패:", error);
        alert("검색에 실패했습니다. 다시 시도해주세요!");
      });
  };

  // 카테고리 명칭 → 코드 변환 함수
  const convertCategory = (name) => {
    const categoryMap = {
      "정비": "R",
      "꿀팁": "T",
      "코스": "C",
      "자유이야기": "F",
    };
    return categoryMap[name] || name; // 매칭 없으면 입력 그대로 반환
  };

  // 키보드 이벤트 처리
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // 엔터키 입력 시 검색 함수 호출
    }
  };


  //=======================================================================

  // 게시글 등록
  const registerPost = () => {

    // 로그인된 사용자 정보 가져오기 (예: localStorage에서)
    const userId = localStorage.getItem("userId"); // 로그인 시 저장한 값 사용

    // 데이터 유효성 검사 추가
    if (!userId) {
      alert("로그인이 필요합니다!");
      return;
    }

    if (!title.trim()) {
      alert("제목을 입력해주세요!");
      return;
    }
    if (!content.trim()) {
      alert("내용을 입력해주세요!");
      return;
    }

    // 새 게시글 데이터
    const newPost = {
      B_TITLE: title,
      B_CATEGORY: category,
      B_CC: "",
      B_CONTENT: content,
      B_CREATED_ID: userId,
      B_VIEWS: 0,
    };

    axios
      .post("http://192.168.0.93:3006/api", newPost)
      .then((response) => {
        alert("게시글 등록 완료!");
        togglePopup("register");
        setPosts([...posts, response.data]); // 데이터 추가가
      })
      .catch((error) => {
        console.error("게시글 등록 실패:", error);
        alert("등록 중 오류가 발생했습니다.");
      });
  };

  //=======================================================================

  // 팝업
  const togglePopup = (type, post = null) => {
    if (type === "view" && post) {
      // 조회수 증가 함수 호출
      increaseViewCount(post.b_ID);
    }

    if (!showPopup) {
      // 팝업 열기
      setPopupType(type);
      setCurrentPost(post);
      setShowPopup(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      // 팝업 닫기
      setIsAnimating(false); // 애니메이션 종료
      setTimeout(() => {
        setShowPopup(false);
        setPopupType(""); // 팝업 타입 초기화
        setCurrentPost(null); // 선택된 게시글 초기화
      }, 300);
    }
  };

  //=======================================================================

  // 조회수 증가
  const increaseViewCount = (postId) => {
    if (!postId) {
      console.error("유효하지 않은 postId:", postId); // 디버깅
      return; // postId가 없으면 요청 중단
    }

    axios
      .patch(`http://192.168.0.93:3006/api/views/${postId}`) // PATCH 요청
      .then(() => {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.B_ID === postId ? { ...post, b_VIEWS: post.b_VIEWS + 1 } : post
          )
        );
      })
      .catch((error) => {
        console.error("조회수 업데이트 실패:", error);
      });
  };

  //=======================================================================


  return (
    <div className="board">
      <div className="board-title">자유게시판</div>
      <div className="search-register">
        <div className="navbar">
          <ul>
            <li><a href="#!" onClick={() => filterPosts("전체")}>전체 -</a></li>
            <li><a href="#!" onClick={() => filterPosts("정비")}>정비</a></li>
            <li><a href="#!" onClick={() => filterPosts("꿀팁")}>꿀팁</a></li>
            <li><a href="#!" onClick={() => filterPosts("코스")}>코스</a></li>
            <li><a href="#!" onClick={() => filterPosts("자유이야기")}>자유이야기</a></li>
          </ul>
        </div>

        <form className="filter-group" onSubmit={(e) => e.preventDefault()}>
          {/* 검색 기준 선택 */}
          <select
            name="category"
            value={searchColumn}
            onChange={(e) => setSearchColumn(e.target.value)}
          > 
            <option value="B_ID">NO</option>
            <option value="B_CATEGORY">구분</option>
            <option value="B_TITLE">제목</option>
            <option value="B_CREATED_ID">작성자</option>
          </select>

          {/* 검색어 입력 */}
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)} // 입력값 상태 저장
            onKeyPress={handleKeyPress} // 엔터키 입력 이벤트 처리
          />
          {/* 검색 버튼 */}
          <button type="button" onClick={handleSearch}>조회</button>

          {/* 등록 버튼 */}
          <button type="button" onClick={() => togglePopup("register")}>
            등록하기
          </button>
        </form>
      </div>

      <table className="freeBoard-table">
        <thead>
          <tr>
            {/* 정렬 클릭 이벤트 및 아이콘 추가 */}
            <th onClick={() => handleSort("b_ID")}>
              NO {sortColumn === "b_ID" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("b_CATEGORY")}>
              구분 {sortColumn === "b_CATEGORY" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("b_TITLE")}>
              제목 {sortColumn === "b_TITLE" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("b_CREATED_ID")}>
              작성자 {sortColumn === "b_CREATED_ID" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("b_CREATED_DATE")}>
              날짜 {sortColumn === "b_CREATED_DATE" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("b_VIEWS")}>
              조회수 {sortColumn === "b_VIEWS" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>

      {/* ================================================================== */}

      {/* 등록 팝업 */}
      {showPopup && popupType === "register" && (
        <div className={`register-popup ${isAnimating ? "open" : "close"}`}>
          <h2>게시글 등록</h2>
          <form>
            <button type="button" className="close-btn" onClick={() => togglePopup("register")}>X</button>
            <div className="form-group">
              <input type="text" placeholder="제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} />
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="정비">정비</option>
                <option value="꿀팁">꿀팁</option>
                <option value="코스">코스</option>
                <option value="자유이야기">자유이야기</option>
              </select>
            </div>
            <textarea placeholder="내용을 입력하세요" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            <button type="button" onClick={registerPost}>등록</button>
          </form>
        </div>
      )}

      {/* ================================================================== */}

      {/* 보기 팝업 */}
      {showPopup && popupType === "view" && (
        <div className={`view-popup ${isAnimating ? "open" : "close"}`}>
          <form>
            <button type="button" className="close-btn" onClick={() => togglePopup("view")}>X</button>
            <h2>{currentPost.b_TITLE}</h2>
            <div className="form-group">
              <p><strong>카테고리 : </strong> {renderCategory(currentPost.b_CATEGORY)}</p>
              <div className="right">
                <p><strong>날짜 : </strong>{new Date(currentPost.b_CREATED_DATE).toLocaleDateString("ko-KR")}</p>
                <p><strong>작성자 : </strong> {currentPost.b_CREATED_ID}</p>
              </div>
            </div>
            <textarea value={currentPost.b_CONTENT} readOnly></textarea>
          </form>
        </div>
      )}
    </div>
  );
};

export default Board;
