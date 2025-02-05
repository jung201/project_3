/*
 * PROJECT       : 주유소/전기차 충전소 정보 제공 및 현재 위치 기준 목적지 추천시스템
 * PROGRAM ID    : Board.js
 * PROGRAM NAME  : 게시판 화면을 담당하는 React 컴포넌트.
 * DESCRIPTION   : 게시판의 목록 조회, 등록, 수정, 삭제, 검색, 정렬, 페이지네이션 등의 기능을 제공하는 컴포넌트.
                    백엔드 API와 연동하여 데이터를 가져오고 렌더링하며, UI 이벤트를 관리함.
 * AUTHOR        : 이정규
 * CREATED DATE  : 2025.02.05
 * HISTORY
 * =====================================================
 * DATE          NAME      DESCRIPTION
 * -----------------------------------------------------
 * 2025.02.05    이정규     초기 버전 작성
 */


import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchBoard } from "../../service/apiService"; // 공통 API 함수
import { registerBoard } from "../../service/apiService"; // 등록 API 함수
import { deleteBoard } from "../../service/apiService"; // 삭제 API 함수
import { updateBoard } from "../../service/apiService"; // 업데이트트 API 함수
import { formatRelativeDate } from "../../utils/dateUtils"; // 유틸 함수 임포트
import {
  getCategoryLabel,
  getCategoryCode,
  getCcLabel,
  getCcCode,
} from "../../utils/categoryUtils"; // 유틸 함수 임포트
import "../../static/scss/Board/board.scss";
import mypageImg from "../../static/images/icons/signin.PNG";
import navFiller from "../../static/images/icons/board.png";
import groupFilter from "../../static/images/icons/searchBTN.png";
import ReactPaginate from "react-paginate"; // 페이지네이션 라이브러리 임포트

// 상태 변수 관리
const Board = () => {
  const userId = sessionStorage.getItem("userId"); // sessionStorage에서 사용자 ID 가져오기
  const [posts, setPosts] = useState([]); // 게시글 목록 상태c
  const [showPopup, setShowPopup] = useState(false); // 팝업 상태
  const [popupType, setPopupType] = useState(""); // 팝업 타입 (등록, 보기)
  const [currentPost, setCurrentPost] = useState(null); // 선택된 게시글 정보
  const [isAnimating, setIsAnimating] = useState(false); // 팝업 애니메이션 상태
  const [selectedCategory, setSelectedCategory] = useState("전체"); // 선택된 카테고리

  useEffect(() => {
    console.log("showPopup 상태 변경 감지:", showPopup);
    console.log("popupType 상태 변경 감지:", popupType);
    console.log("currentPost 상태 변경 감지:", currentPost);

    // 팝업 상태가 true일 때 로직 추가 가능
    if (showPopup) {
      console.log("팝업이 열림:", popupType);
    }
  }, [showPopup, popupType, currentPost]);

  // 사용자 입력 상태 관리
  const [title, setTitle] = useState(""); // 제목 상태
  const [category, setCategory] = useState(""); // 카테고리 상태
  const [cc, setCc] = useState(""); // 배기량 상태 추가
  const [content, setContent] = useState(""); // 내용 상태

  // 정렬 기준과 순서 상태 추가
  const [sortColumn, setSortColumn] = useState(""); // 정렬 기준
  const [sortOrder, setSortOrder] = useState("asc"); // 정렬 순서(오름차순)

  // 검색어
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 상태
  const [searchColumn, setSearchColumn] = useState("bid"); // 검색 기준

  // 페이지 네이션
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
  const itemsPerPage = 10; // 한 페이지당 아이템 수

  // 현재 페이지에 표시될 데이터 계산
  const offset = currentPage * itemsPerPage; // 페이지 시작 위치 계산

  // 페이지 변경 처리 함수
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected); // 선택된 페이지로 상태 업데이트
  };

  //=======================================================================

  // 백엔드에서 데이터 불러오기 (컴포넌트 마운트 시 1회 실행)
  useEffect(() => {
    const loadBoard = async () => {
      try {
        const data = await fetchBoard();
        setPosts(data); // 게시글 목록 상태 업데이트
      } catch (error) {
        console.error("게시글 불러오기 실패:", error); // 실패 시 오류 로그 출력
      }
    };

    loadBoard(); // 데이터 불러오기 실행
  }, []); // 빈 배열 -> 처음 한 번만 실행

  //=======================================================================

  // 테이블 렌더링
  const renderTable = () =>
    posts
      .filter(
        (post) =>
          selectedCategory === "전체" ||
          getCategoryLabel(post.bcategory) === selectedCategory
      )
      .slice(offset, offset + itemsPerPage) // 페이지네이션 적용
      .map((post, index) => {
        const isNew = (new Date() - new Date(post.bcreatedDate)) / 1000 < 86400;
        const isHot = post.bviews >= 10;

        return (
          <tr key={post.bid || index} onClick={() => togglePopup("view", post)}>
            <td>{post.bid}</td>
            <td className={`category ${post.bcategory}`}>
              {getCategoryLabel(post.bcategory)}
            </td>
            <td>{getCcLabel(post.bcc)}</td>
            <td>
              {post.btitle}
              {isNew && <span className="new-tag">NEW</span>}
              {isHot && <span className="hot-tag">HOT</span>}
            </td>
            <td>
              <div className="user-profile">
                <img src={mypageImg} alt="프로필" className="profile-img" />
                {post.bwriter}
              </div>
            </td>
            <td>{post.bviews}</td>
            <td>{formatRelativeDate(post.bcreatedDate)}</td>
          </tr>
        );
      });

  //=======================================================================

  // 게시글 등록
  const registerPost = async () => {
    // 세션에서 로그인된 사용자 ID 가져오기 (로그인하지 않으면 등록 불가)
    const userId = sessionStorage.getItem("userId");
    // 카테고리와 배기량 변환
    const categoryCode = getCategoryCode(category); // 한글 -> 코드 (예: "정비" -> "R")
    const ccCode = getCcCode(cc); // 한글 -> 코드 (예: "스쿠터" -> "S")

    console.log("변환된 카테고리 코드:", categoryCode);
    console.log("변환된 배기량 코드:", ccCode);

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

    if (!categoryCode || !ccCode) {
      alert("유효하지 않은 카테고리 또는 배기량입니다.");
      return;
    }

    // 등록할 데이터 객체 생성
    const newPost = {
      btitle: title,
      bcategory: categoryCode,
      bcc: ccCode,
      bcontent: content,
      bcreatedId: userId,
      bviews: 0, // 기본 조회수 0
    };

    try {
      const response = await registerBoard(newPost);
      alert("게시글 등록 완료!");
      togglePopup("register");
      setPosts([...posts, response]);
      window.location.reload(); // 페이지 리프레시

    } catch (error) {
      console.error("게시글 등록 실패:", error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  // 게시글 삭제
  const handleDelete = async (postId) => {
    const currentUserId = sessionStorage.getItem("userId");

    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        alert("게시글이 삭제되었습니다 !");
        await deleteBoard(postId, currentUserId);
        window.location.reload();

      } catch (error) {
        console.error("삭제 실패 : ", error);
        if (error.response && error.response.status === 403) {
          alert("작성자만 삭제할 수 있습니다 !");
        } else {
          alert("오류가 발생했습니다. 다시 시도해 주세요 !");
        }
      }
    }
  };

  // 게시글 수정
  const handleUpdate = async (postId) => {
    // 카테고리와 배기량 변환
    const categoryCode = getCategoryCode(category); // 한글 -> 코드 (예: "정비" -> "R")
    const ccCode = getCcCode(cc); // 한글 -> 코드 (예: "스쿠터" -> "S")

    const updatedPost = {
      btitle: title,
      bcategory: categoryCode,
      bcc: ccCode,
      bcontent: content,
      bcreatedId: sessionStorage.getItem("userId"),
    };
    console.log("수정 요청 ID:", postId); // 디버깅
    console.log("수정 요청 데이터:", updatedPost); // 디버깅

    try {
      const message = await updateBoard(postId, updatedPost);
      alert(message);
      window.location.reload(); // 페이지 리프레시

    } catch (error) {
      console.error("게시글 수정 실패:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  //=======================================================================

  // 카테고리별 필터링 함수
  const filterPosts = (category) => {
    setSelectedCategory(category); // 선택된 카테고리 상태 업데이트

    // board 요청 보내기
    axios
      .get(
        `http://192.168.0.93:3006/board?category=${category === "전체" ? "" : getCategoryCode}`
      )
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
      let aValue = column === "bcreatedDate" ? new Date(a[column]) : a[column];
      let bValue = column === "bcreatedDate" ? new Date(b[column]) : b[column];

      // 비교 및 정렬
      if (aValue < bValue) return order === "asc" ? -1 : 1;
      if (aValue > bValue) return order === "asc" ? 1 : -1;
      return 0;
    });

    setPosts(sortedPosts); // 정렬된 데이터 적용
  };

  //=======================================================================

  // 검색기능
  const handleSearch = () => {
    // 검색어 유효성 검사
    if (!searchKeyword.trim()) {
      alert("검색어를 입력해주세요!");
      return;
    }

    // 컬럼 이름 매핑
    const columnMap = {
      bid: "bId",
      bcategory: "bCategory",
      bcc: "bCc",
      btitle: "bTitle",
      bcreatedid: "bWriter",
    };

    const column = columnMap[searchColumn.toLowerCase()] || searchColumn; // 대소문자 변환
    let keyword = searchKeyword.trim();

    // 1. 구분(bcategory) 변환
    if (column === "bcategory") {
      keyword = getCategoryCode(keyword.trim()); // 한글을 코드로 변환
      console.log("변환된 키워드:", keyword); // 디버깅 로그 추가
      if (!keyword) {
        console.log("검색어:", keyword); // 값 확인
        alert("유효한 구분을 입력해주세요! (정비, 꿀팁, 코스, 자유)");
        return;
      }
    }

    // 2. CC(bcc) 변환
    if (column === "bcc") {
      keyword = getCcCode(keyword.trim()); // 한글을 코드로 변환
      console.log("변환된 키워드:", keyword); // 디버깅 로그 추가
      if (!keyword) {
        alert("유효한 배기량을 입력해주세요! (스쿠터, 소형, 중형, 리터)");
        return;
      }
    }

    // 3. NO(bid) 숫자 검증
    if (column === "bid" && isNaN(keyword)) {
      alert("NO는 숫자로 입력해주세요!");
      return;
    }

    // board 호출
    axios
      .get(`http://192.168.0.93:3006/board/search`, {
        params: { column, keyword },
      })
      .then((response) => {
        setPosts(response.data); // 검색 결과 반영
      })
      .catch((error) => {
        console.error("검색 실패:", error);
        alert("검색에 실패했습니다. 다시 시도해주세요!");
      });
  };

  // 키보드 이벤트 처리
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // 엔터키 입력 시 검색 함수 호출
    }
  };

  //=======================================================================

  // 조회수 증가
  const increaseViewCount = (postid) => {
    if (!postid) {
      console.error("유효하지 않은 postid:", postid); // 디버깅
      return; // postid가 없으면 요청 중단
    }

    axios
      .patch(`http://192.168.0.93:3006/board/views/${postid}`) // PATCH 요청
      .then(() => {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.bid === postid ? { ...post, bviews: post.bviews + 1 } : post
          )
        );
      })
      .catch((error) => {
        console.error("조회수 업데이트 실패:", error);
      });
  };

  //=======================================================================

  // 팝업
  const togglePopup = (type, post = null) => {
    console.log("togglePopup called:", { type, post });

    // 보기 팝업: 조회수 증가 함수 호출
    if (type === "view" && post) {
      increaseViewCount(post.bid);
    }

    // 수정 팝업: 필드 초기화 (기존 데이터 유지)
    if (type === "edit" && post) {
      console.log("Initializing edit popup with post:", post);
      setTitle(post.btitle || ""); // 게시글 제목 설정
      setCategory(getCategoryLabel(post.bcategory) || ""); // 카테고리 설정
      setCc(getCcLabel(post.bcc) || ""); // 배기량 설정
      setContent(post.bcontent || ""); // 게시글 내용 설정
    }

    // 팝업 열기
    if (!showPopup || popupType !== type) {
      setCurrentPost(post); // 선택된 게시글 데이터 저장
      setPopupType(type); // 팝업 타입 설정
      setShowPopup(true); // 팝업 열기
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      // 팝업 닫기
      setIsAnimating(false);
      setTimeout(() => {
        setShowPopup(false);
        setPopupType("");
        setCurrentPost(null);
      }, 300);
    }
  };


  //=======================================================================

  return (
    <div className="board">
      <div className="board-title"></div>
      <div className="search-register">
        <div className="navbar">
          <ul>
            <div className="user-profile">
              <img src={navFiller} alt="프로필" className="profile-img" />
            </div>
            <li>
              <a href="#!" onClick={() => filterPosts("전체")}>
                전체 -
              </a>
            </li>
            <li>
              <a href="#!" onClick={() => filterPosts("정비")}>
                정비
              </a>
            </li>
            <li>
              <a href="#!" onClick={() => filterPosts("꿀팁")}>
                꿀팁
              </a>
            </li>
            <li>
              <a href="#!" onClick={() => filterPosts("코스")}>
                코스
              </a>
            </li>
            <li>
              <a href="#!" onClick={() => filterPosts("자유")}>
                자유
              </a>
            </li>
          </ul>
        </div>

        <form className="filter-group" onSubmit={(e) => e.preventDefault()}>
          <div className="user-profile">
            <img src={groupFilter} alt="프로필" className="groupFilter-img" />
          </div>

          {/* 검색 기준 선택 */}
          <select
            name="category"
            value={searchColumn}
            onChange={(e) => setSearchColumn(e.target.value)}
          >
            <option value="bid">NO</option>
            <option value="bcategory">구분</option>
            <option value="bcc">배기량</option>
            <option value="btitle">제목</option>
            <option value="bWriter">닉네임</option>
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
          <button type="button" onClick={handleSearch}>
            조회
          </button>

          {/* 등록 버튼 */}
          <button type="button" onClick={() => togglePopup("register")}>
            등록
          </button>
        </form>
      </div>

      <table className="freeBoard-table">
        <thead>
          <tr>
            {/* 정렬 클릭 이벤트 및 아이콘 추가 */}
            <th onClick={() => handleSort("bid")}>
              NO {sortColumn === "bid" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("bcategory")}>
              구분{" "}
              {sortColumn === "bcategory"
                ? sortOrder === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th onClick={() => handleSort("bcc")}>
              배기량{" "}
              {sortColumn === "bcc" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("btitle")}>
              제목{" "}
              {sortColumn === "btitle" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("bcreatedId")}>
              작성자{" "}
              {sortColumn === "bcreatedId"
                ? sortOrder === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th onClick={() => handleSort("bviews")}>
              조회수{" "}
              {sortColumn === "bviews" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("bcreatedDate")}>
              날짜{" "}
              {sortColumn === "bcreatedDate"
                ? sortOrder === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>

      <ReactPaginate
        previousLabel={"이전"}
        nextLabel={"다음"}
        breakLabel={"..."}
        pageCount={Math.ceil(posts.length / itemsPerPage)} // 전체 페이지 수 계산
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange} // 페이지 변경 이벤트 처리
        containerClassName={"pagination"} // CSS 클래스 추가
        activeClassName={"active"}
      />

      {/* ================================================================== */}

      {/* 등록 팝업 */}
      {showPopup && popupType === "register" && (
        <div className={`register-popup ${isAnimating ? "open" : "close"}`}>
          <h2>게시글 등록</h2>
          <form>
            <button
              type="button"
              className="close-btn"
              onClick={() => togglePopup("register")}
            >
              X
            </button>
            <div className="form-group">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">카테고리 선택</option>
                <option value="정비">정비</option>
                <option value="꿀팁">꿀팁</option>
                <option value="코스">코스</option>
                <option value="자유">자유</option>
              </select>

              <select value={cc} onChange={(e) => setCc(e.target.value)}>
                <option value="">배기량 선택</option>
                <option value="스쿠터">스쿠터</option>
                <option value="소형">소형</option>
                <option value="중형">중형</option>
                <option value="리터">리터</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <textarea
              placeholder="내용을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button
              type="button"
              onClick={registerPost}
              className="editor-submit-button"
            >
              등록
            </button>
          </form>
        </div>
      )}

      {/* ================================================================== */}

      {/* 보기 팝업 */}
      {showPopup && popupType === "view" && (
        <div className={`view-popup ${isAnimating ? "open" : "close"}`}>
          <form>
            <button
              type="button"
              className="close-btn"
              onClick={() => togglePopup("view")}
            >
              X
            </button>
            <h2>{currentPost.btitle}</h2>
            <div className="title-bo"></div>
            <div className="form-group">
              <div className="left">
                <p>
                  <strong>카테고리 : </strong>{" "}
                  {getCategoryLabel(currentPost.bcategory)}
                </p>
                <p>
                  <strong>배기량 : </strong> {getCcLabel(currentPost.bcc)}
                </p>
              </div>
              <div className="right">
                <p>
                  <strong>날짜 : </strong>
                  {new Date(currentPost.bcreatedDate).toLocaleDateString(
                    "ko-KR"
                  )}
                </p>
                <p>
                  <strong>작성자 : </strong> {currentPost.bwriter}
                </p>
              </div>
            </div>
            <textarea value={currentPost.bcontent} readOnly></textarea>
            <div className="view-btn">
              {/* 작성자와 로그인 사용자 ID 비교 */}
              {currentPost.bcreatedId === sessionStorage.getItem("userId") && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      togglePopup("edit", currentPost);
                    }}
                  >
                    수정
                  </button>
                  <button onClick={() => handleDelete(currentPost.bid)}>
                    삭제
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      )}

      {/* ================================================================== */}

      {/* 수정 팝업 */}
      {showPopup && popupType === "edit" && currentPost && (
        <div className={`edit-popup ${isAnimating ? "open" : "close"}`}>
          <h2>게시글 수정</h2>
          <form>
            <button
              type="button"
              className="close-btn"
              onClick={() => togglePopup("edit")}
            >
              X
            </button>
            <div className="form-group">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">카테고리 선택</option>
                <option value="정비">정비</option>
                <option value="꿀팁">꿀팁</option>
                <option value="코스">코스</option>
                <option value="자유">자유</option>
              </select>
              <select value={cc} onChange={(e) => setCc(e.target.value)}>
                <option value="">배기량 선택</option>
                <option value="스쿠터">스쿠터</option>
                <option value="소형">소형</option>
                <option value="중형">중형</option>
                <option value="리터">리터</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <textarea
              placeholder="내용을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <div className="edit-btn">
              <button
                type="button"
                onClick={() => handleUpdate(currentPost.bid)}
                className="editor-submit-button"
              >
                확인
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Board;
